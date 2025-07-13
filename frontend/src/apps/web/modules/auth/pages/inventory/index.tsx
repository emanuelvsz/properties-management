import React, { useEffect, useState, useCallback, useRef } from "react";
import { css } from "@emotion/react";
import {
	Button,
	Card,
	Col,
	Input,
	Row,
	Select,
	Space,
	Table,
	Tag,
	Typography,
	message,
	Modal,
	Popconfirm,
	Flex,
	Tooltip
} from "antd";
import {
	PlusOutlined,
	SearchOutlined,
	ExclamationCircleOutlined,
	DeleteOutlined,
	EditOutlined
} from "@ant-design/icons";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";

import { InventoryItem } from "@core/domain/models/inventory/inventory-item";
import { InventoryCategory } from "@core/domain/models/inventory/inventory-category";
import { useInventoryContext } from "@web/lib/contexts/inventory/hooks";
import { THEME_COLORS } from "@web/config/theme";
import InventoryModalForm from "@web/components/inventory-modal-form";
import BoardPageHeader from "../home/components/finance-bar-panel";

const { Text } = Typography;
const { Option } = Select;
const { confirm } = Modal;

const styles = {
	container: css`
		background-color: ${THEME_COLORS.GRAY_COLOR};
		min-height: calc(100vh - 4rem - 36px);
		padding-inline: 2rem;
		padding-block: 1rem;
	`,
	header: css`
		margin-bottom: 2rem;
	`,
	card: css`
		width: 100%;
	`,
	filterContainer: css`
		margin-bottom: 1rem;
	`,
	searchInput: css`
		width: 300px;
	`,
	conditionTag: {
		excellent: { color: "green", text: "page.inventory.condition.excellent" },
		good: { color: "blue", text: "page.inventory.condition.good" },
		fair: { color: "orange", text: "page.inventory.condition.fair" },
		poor: { color: "red", text: "page.inventory.condition.poor" },
		damaged: { color: "red", text: "page.inventory.condition.damaged" }
	},
	button: css`
		height: 35px !important;
		box-shadow: none !important;
	`
};

const InventoryPage = () => {
	const intl = useIntl();
	const [searchParams, setSearchParams] = useSearchParams();
	const [messageApi, contextHolder] = message.useMessage();

	const {
		inventoryItems,
		categories,
		loading,
		error,
		listItems,
		deleteItem,
		listCategories,
		createItem,
		updateItem
	} = useInventoryContext();

	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

	const didMountRef = useRef(false);

	const [searchText, setSearchText] = useState(searchParams.get("q") || "");
	const [selectedCategory, setSelectedCategory] = useState(
		searchParams.get("category") || undefined
	);
	const [selectedCondition, setSelectedCondition] = useState(
		searchParams.get("condition") || undefined
	);

	useEffect(() => {
		const categoryParam = searchParams.get("category");
		const conditionParam = searchParams.get("condition");

		setSelectedCategory(categoryParam || undefined);
		setSelectedCondition(conditionParam || undefined);
	}, [searchParams]);

	const debouncedSearch = useCallback(
		debounce((text: string) => {
			const newParams = new URLSearchParams(searchParams);
			if (text) {
				newParams.set("q", text);
			} else {
				newParams.delete("q");
			}
			newParams.set("page", "1");
			setSearchParams(newParams);
		}, 500),
		[searchParams]
	);

	useEffect(() => {
		loadCategories();
	}, []);

	useEffect(() => {
		if (error) {
			messageApi.error(error);
		}
	}, [error, messageApi]);

	useEffect(() => {
		debouncedSearch(searchText);
	}, [searchText, debouncedSearch]);

	useEffect(() => {
		const newParams = new URLSearchParams(searchParams);
		let updated = false;
		if (selectedCategory) {
			newParams.set("category", selectedCategory);
			updated = true;
		} else if (newParams.has("category")) {
			newParams.delete("category");
			updated = true;
		}
		if (selectedCondition) {
			newParams.set("condition", selectedCondition);
			updated = true;
		} else if (newParams.has("condition")) {
			newParams.delete("condition");
			updated = true;
		}
		if (updated) {
			newParams.set("page", "1");
			setSearchParams(newParams);
		}
	}, [selectedCategory, selectedCondition, searchParams]);

	useEffect(() => {
		if (!didMountRef.current) {
			didMountRef.current = true;
			loadData();
			return;
		}
		loadData();
	}, [searchParams]);

	const loadData = async () => {
		const params = {
			q: searchParams.get("q") || undefined,
			categoryId: searchParams.get("category") || undefined,
			condition: searchParams.get("condition") || undefined,
			page: parseInt(searchParams.get("page") || "1")
		};
		await listItems(params);
	};

	const loadCategories = async () => {
		await listCategories();
	};

	const handleReset = () => {
		setSearchText("");
		setSelectedCategory(undefined);
		setSelectedCondition(undefined);
		setSearchParams({ page: "1" });
		loadData();
	};

	const handleAdd = () => {
		setEditingItem(null);
		setModalVisible(true);
	};

	const handleEdit = (record: InventoryItem) => {
		setEditingItem(record);
		setModalVisible(true);
	};

	const handleDelete = (id: string) => {
		confirm({
			title: intl.formatMessage({ id: "general.delete.message" }),
			icon: <ExclamationCircleOutlined />,
			content: intl.formatMessage({ id: "page.inventory.table.delete" }),
			okText: intl.formatMessage({ id: "general.yes" }),
			cancelText: intl.formatMessage({ id: "general.no" }),
			onOk: async () => {
				try {
					await deleteItem(id);
					messageApi.success(
						intl.formatMessage({ id: "page.inventory.success.deleted" })
					);
					loadData();
				} catch (error) {
					messageApi.error(
						intl.formatMessage({ id: "page.inventory.error.delete" })
					);
				}
			}
		});
	};

	const handleBulkDelete = () => {
		confirm({
			title: intl.formatMessage({ id: "general.delete.message" }),
			icon: <ExclamationCircleOutlined />,
			content: intl.formatMessage(
				{ id: "page.inventory.delete.selected" },
				{ count: selectedRowKeys.length }
			),
			okText: intl.formatMessage({ id: "general.yes" }),
			cancelText: intl.formatMessage({ id: "general.no" }),
			onOk: async () => {
				try {
					for (const key of selectedRowKeys) {
						await deleteItem(key.toString());
					}
					messageApi.success(
						intl.formatMessage(
							{ id: "page.inventory.success.bulk-deleted" },
							{ count: selectedRowKeys.length }
						)
					);
					setSelectedRowKeys([]);
					loadData();
				} catch (error) {
					messageApi.error(
						intl.formatMessage({ id: "page.inventory.error.bulk-delete" })
					);
				}
			}
		});
	};

	const handleModalSubmit = async (data: any) => {
		try {
			if (editingItem) {
				await updateItem({ ...editingItem, ...data });
				messageApi.success(
					intl.formatMessage({ id: "page.inventory.success.updated" })
				);
			} else {
				await createItem(data);
				messageApi.success(
					intl.formatMessage({ id: "page.inventory.success.created" })
				);
			}
			setModalVisible(false);
			setEditingItem(null);
			loadData();
		} catch (error) {
			messageApi.error(intl.formatMessage({ id: "page.inventory.error.save" }));
		}
	};

	const handleModalCancel = () => {
		setModalVisible(false);
		setEditingItem(null);
	};

	const columns = [
		{
			title: intl.formatMessage({ id: "page.inventory.table.name" }),
			dataIndex: "name",
			key: "name",
			render: (text: string, record: InventoryItem) => (
				<div>
					<Text strong>{record.name || text}</Text>
					<br />
					<Text type="secondary" style={{ fontSize: "12px" }}>
						{record.category?.name ||
							intl.formatMessage({ id: "general.not.informed" })}
					</Text>
				</div>
			)
		},
		{
			title: intl.formatMessage({ id: "page.inventory.table.property" }),
			dataIndex: "propertyTitle",
			key: "propertyTitle",
			render: (text: string, record: InventoryItem) => (
				<div>
					<Text strong>
						{record.propertyTitle ||
							text ||
							intl.formatMessage({ id: "general.not.informed" })}
					</Text>
					<br />
					<Text type="secondary" style={{ fontSize: "12px" }}>
						{intl.formatMessage({ id: "page.inventory.table.property.code" })}:{" "}
						{record.propertyCode ||
							intl.formatMessage({ id: "general.not.informed" })}
					</Text>
				</div>
			)
		},
		{
			title: intl.formatMessage({ id: "page.inventory.table.quantity" }),
			dataIndex: "quantity",
			key: "quantity",
			render: (quantity: number, record: InventoryItem) => {
				const quantityValue = record.quantity || quantity;
				return <Tag color="blue">{quantityValue}x</Tag>;
			}
		},
		{
			title: intl.formatMessage({ id: "page.inventory.table.condition" }),
			dataIndex: "condition",
			key: "condition",
			render: (condition: string, record: InventoryItem) => {
				const conditionValue = record.condition || condition;
				const conditionConfig =
					styles.conditionTag[
						conditionValue as keyof typeof styles.conditionTag
					];
				return (
					<Tag color={conditionConfig?.color || "default"}>
						{intl.formatMessage({
							id: conditionConfig?.text || conditionValue
						})}
					</Tag>
				);
			}
		},
		{
			title: intl.formatMessage({ id: "page.inventory.table.value" }),
			dataIndex: "purchasePrice",
			key: "purchasePrice",
			render: (price: number, record: InventoryItem) => {
				const priceValue = record.purchasePrice;
				return (
					<Text>
						{priceValue && priceValue > 0
							? `${intl.formatMessage({ id: "general.currency.symbol" })} ${priceValue.toFixed(2)}`
							: intl.formatMessage({ id: "general.not.informed" })}
					</Text>
				);
			}
		},
		{
			title: intl.formatMessage({ id: "page.inventory.table.actions" }),
			key: "actions",
			render: (_: any, record: InventoryItem) => (
				<Space>
					<Button
						type="link"
						size="small"
						onClick={() => handleEdit(record)}
						icon={<EditOutlined />}
					/>
					<Popconfirm
						title={intl.formatMessage({
							id: "page.inventory.table.delete.confirm"
						})}
						onConfirm={() => handleDelete(record.id)}
						okText={intl.formatMessage({ id: "general.yes" })}
						cancelText={intl.formatMessage({ id: "general.no" })}
						placement="left"
					>
						<Button type="text" danger icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			)
		}
	];

	const rowSelection = {
		selectedRowKeys,
		onChange: (newSelectedRowKeys: React.Key[]) => {
			setSelectedRowKeys(newSelectedRowKeys);
		}
	};

	return (
		<>
			{contextHolder}
			<Flex css={styles.container} vertical gap={10} flex={1}>
				<BoardPageHeader
					title={intl.formatMessage({ id: "page.inventory.title" })}
					prefix={intl.formatMessage({ id: "page.inventory.subtitle" })}
					extra={
						<Tooltip
							title={intl.formatMessage({
								id: "component.page-header-actions.tooltip.add"
							})}
						>
							<Button
								type="primary"
								icon={<PlusOutlined />}
								onClick={handleAdd}
								css={styles.button}
							/>
						</Tooltip>
					}
				/>
				<Card css={styles.card}>
					<div css={styles.filterContainer}>
						<Row gutter={16} align="middle">
							<Col>
								<Input
									placeholder={intl.formatMessage({
										id: "page.inventory.search.placeholder"
									})}
									value={searchText}
									onChange={(e) => setSearchText(e.target.value)}
									prefix={<SearchOutlined />}
									css={styles.searchInput}
								/>
							</Col>
							<Col>
								<Select
									placeholder={intl.formatMessage({
										id: "page.inventory.category.placeholder"
									})}
									value={selectedCategory}
									onChange={setSelectedCategory}
									style={{ width: 200 }}
									allowClear
								>
									{categories.items.map((category: InventoryCategory) => (
										<Option key={category.id} value={category.id}>
											{category.name}
										</Option>
									))}
								</Select>
							</Col>
							<Col>
								<Select
									placeholder={intl.formatMessage({
										id: "page.inventory.condition.placeholder"
									})}
									value={selectedCondition}
									onChange={setSelectedCondition}
									style={{ width: 150 }}
									allowClear
								>
									<Option value="excellent">
										{intl.formatMessage({
											id: "page.inventory.condition.excellent"
										})}
									</Option>
									<Option value="good">
										{intl.formatMessage({
											id: "page.inventory.condition.good"
										})}
									</Option>
									<Option value="fair">
										{intl.formatMessage({
											id: "page.inventory.condition.fair"
										})}
									</Option>
									<Option value="poor">
										{intl.formatMessage({
											id: "page.inventory.condition.poor"
										})}
									</Option>
									<Option value="damaged">
										{intl.formatMessage({
											id: "page.inventory.condition.damaged"
										})}
									</Option>
								</Select>
							</Col>
							<Col>
								<Button onClick={handleReset}>
									{intl.formatMessage({ id: "page.inventory.clear" })}
								</Button>
							</Col>
						</Row>
					</div>

					{selectedRowKeys.length > 0 && (
						<div style={{ marginBottom: 16 }}>
							<Button danger onClick={handleBulkDelete}>
								{intl.formatMessage(
									{ id: "page.inventory.delete.selected" },
									{ count: selectedRowKeys.length }
								)}
							</Button>
						</div>
					)}

					<Table
						columns={columns}
						dataSource={inventoryItems.items}
						rowKey="id"
						loading={loading}
						rowSelection={rowSelection}
						pagination={{
							current: inventoryItems.page,
							pageSize: inventoryItems.pageSize,
							total: inventoryItems.total,
							showSizeChanger: true,
							showQuickJumper: true,
							showTotal: (total, range) =>
								intl.formatMessage(
									{ id: "page.inventory.table.pagination.total" },
									{
										start: range[0],
										end: range[1],
										total: total
									}
								)
						}}
						onChange={(pagination) => {
							const newParams = new URLSearchParams(searchParams);
							newParams.set("page", pagination.current?.toString() || "1");
							setSearchParams(newParams);
						}}
					/>
				</Card>
			</Flex>
			<InventoryModalForm
				visible={modalVisible}
				onCancel={handleModalCancel}
				onSubmit={handleModalSubmit}
				editingItem={editingItem}
			/>
		</>
	);
};

export default InventoryPage;
