import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { css } from "@emotion/react";
import {
	Button,
	Card,
	Col,
	Flex,
	Popconfirm,
	Row,
	Space,
	Tag,
	Typography
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

import { InventoryItem } from "@core/domain/models/inventory/inventory-item";
import { Pagination } from "@core/domain/models/pagination";
import Table from "@web/components/table";
import BoardPageHeader from "../../../home/components/finance-bar-panel";
import { useInventoryContext } from "@web/lib/contexts/inventory/hooks";
import { THEME_COLORS } from "@web/config/theme";
import InventoryModalForm from "@web/components/inventory-modal-form";
import EmptySection from "@web/components/empty-section";

const { Text } = Typography;

const styles = {
	container: css`
		background-color: ${THEME_COLORS.WHITE_COLOR};
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	`,
	tableItemExpanded: css`
		margin: 0;
		padding: 1rem;
		background-color: #fafafa;
		border-radius: 4px;
	`
};

interface Props {
	pagination: Pagination<InventoryItem>;
	loading?: boolean;
	onReload?: (page: number) => void;
	onSearchChange?: (value: string) => void;
	onCategoryChange?: (value: string) => void;
	onConditionChange?: (value: string) => void;
	searchValue?: string;
	categoryValue?: string;
	conditionValue?: string;
	hideActions: boolean;
}

const InventoryListRow = ({
	pagination,
	loading = false,
	onReload,
	// onSearchChange,
	// onCategoryChange,
	// onConditionChange,
	searchValue = "",
	categoryValue = "",
	conditionValue = "",
	hideActions = false
}: Props) => {
	const intl = useIntl();
	const { id: propertyId } = useParams<{ id: string }>();
	const [currentPage, setCurrentPage] = useState(1);
	const [modalVisible, setModalVisible] = useState(false);
	const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

	const {
		listItems,
		deleteItem,
		createItem,
		updateItem,
		// categories,
		loading: inventoryLoading
	} = useInventoryContext();

	const [loadingState, setLoadingState] = useState({
		delete: false,
		list: false
	});

	const handleList = async (page?: number) => {
		if (!propertyId) return;
		const pageNum = page || 1;
		setCurrentPage(pageNum);
		setLoadingState((prev) => ({ ...prev, list: true }));

		try {
			const params = {
				property: propertyId,
				q: searchValue || undefined,
				categoryId: categoryValue || undefined,
				condition: conditionValue || undefined,
				page: pageNum
			};
			await listItems(params);
		} catch (error) {
			// Error handling
		} finally {
			setLoadingState((prev) => ({ ...prev, list: false }));
		}
	};

	const handleDelete = async (id: string) => {
		setLoadingState((prev) => ({ ...prev, delete: true }));
		try {
			await deleteItem(id);
			handleList(currentPage);
		} catch (error) {
			// Error handling
		} finally {
			setLoadingState((prev) => ({ ...prev, delete: false }));
		}
	};

	const handleAdd = () => {
		setEditingItem(null);
		setModalVisible(true);
	};

	const handleEdit = (record: InventoryItem) => {
		setEditingItem(record);
		setModalVisible(true);
	};

	const handleModalSubmit = async (data: any) => {
		try {
			// Forçar a propriedade atual se estiver na página de propriedade
			if (propertyId) {
				data.property = propertyId;
			}

			if (editingItem) {
				await updateItem(data);
			} else {
				await createItem(data);
			}
			setModalVisible(false);
			setEditingItem(null);
			handleList(currentPage);
		} catch (error) {
			// Error handling
		}
	};

	const handleModalCancel = () => {
		setModalVisible(false);
		setEditingItem(null);
	};

	useEffect(() => {
		handleList();
	}, [searchValue, categoryValue, conditionValue]);

	const getConditionTag = (condition: string) => {
		const conditionMap = {
			excellent: { color: "green", text: "page.inventory.condition.excellent" },
			good: { color: "blue", text: "page.inventory.condition.good" },
			fair: { color: "orange", text: "page.inventory.condition.fair" },
			poor: { color: "red", text: "page.inventory.condition.poor" },
			damaged: { color: "red", text: "page.inventory.condition.damaged" }
		};
		const config = conditionMap[condition as keyof typeof conditionMap];
		return (
			<Tag color={config?.color || "default"}>
				{intl.formatMessage({ id: config?.text || condition })}
			</Tag>
		);
	};

	const inventoryColumns: ColumnsType<InventoryItem> = [
		{
			title: intl.formatMessage({ id: "page.inventory.table.name" }),
			dataIndex: "name",
			key: "name",
			render: (text: string, record: InventoryItem) => (
				<div>
					<Text strong>{text}</Text>
					<br />
					<Text type="secondary" style={{ fontSize: "12px" }}>
						{record.category.name}
					</Text>
				</div>
			)
		},
		{
			title: intl.formatMessage({ id: "page.inventory.table.quantity" }),
			dataIndex: "quantity",
			key: "quantity",
			render: (quantity: number) => <Tag color="blue">{quantity}x</Tag>
		},
		{
			title: intl.formatMessage({ id: "page.inventory.table.condition" }),
			dataIndex: "condition",
			key: "condition",
			render: (condition: string) => getConditionTag(condition)
		},
		{
			title: intl.formatMessage({ id: "page.inventory.table.value" }),
			dataIndex: "purchasePrice",
			key: "purchasePrice",
			render: (price: number) => (
				<Text>{price ? `R$ ${price.toFixed(2)}` : "N/A"}</Text>
			)
		},
		{
			title: intl.formatMessage({ id: "page.inventory.table.actions" }),
			key: "actions",
			render: (_: any, record: InventoryItem) => (
				<Space>
					<Button type="link" size="small" onClick={() => handleEdit(record)}>
						{intl.formatMessage({ id: "page.inventory.table.edit" })}
					</Button>
					<Popconfirm
						title={intl.formatMessage({ id: "general.delete.message" })}
						onConfirm={() => handleDelete(record.id)}
						okText={intl.formatMessage({ id: "general.yes" })}
						cancelText={intl.formatMessage({ id: "general.no" })}
					>
						<Button
							type="link"
							size="small"
							danger
							loading={loadingState.delete}
						>
							{intl.formatMessage({ id: "page.inventory.table.delete" })}
						</Button>
					</Popconfirm>
				</Space>
			)
		}
	];

	return (
		<>
			<Card css={styles.container}>
				{pagination.total === 0 ? (
					<EmptySection
						entity={intl.formatMessage({ id: "component.side-menu.section.pages.item.inventory" })}
						onSubmit={() => setModalVisible(true)}
					/>
				) : (
					<Flex vertical gap={16}>
						<BoardPageHeader
							title={intl.formatMessage({ id: "page.inventory.tab.title" })}
							// subtitle={intl.formatMessage({ id: "page.inventory.tab.subtitle" })}
							extra={
								!hideActions && (
									<Button
										type="primary"
										icon={<PlusOutlined />}
										onClick={handleAdd}
									>
										{intl.formatMessage({ id: "page.inventory.add-item" })}
									</Button>
								)
							}
						/>
						{pagination.total >= 1 ? (
							<Table
								columns={inventoryColumns}
								dataSource={pagination.items}
								rowKey="id"
								pagination={{
									current: pagination.page,
									pageSize: pagination.pageSize,
									total: pagination.count,
									onChange: (page) => {
										onReload && onReload(page);
									}
								}}
								scroll={{ x: "max-content" }}
								loading={loading || inventoryLoading || loadingState.list}
								size="small"
								expandable={{
									expandedRowRender: (record) => (
										<div css={styles.tableItemExpanded}>
											{record.description && (
												<p>
													<strong>
														{intl.formatMessage({
															id: "page.inventory.form.description.label"
														})}
														:
													</strong>{" "}
													{record.description}
												</p>
											)}
											{record.brand && (
												<p>
													<strong>
														{intl.formatMessage({
															id: "page.inventory.form.brand.label"
														})}
														:
													</strong>{" "}
													{record.brand}
												</p>
											)}
											{record.model && (
												<p>
													<strong>
														{intl.formatMessage({
															id: "page.inventory.form.model.label"
														})}
														:
													</strong>{" "}
													{record.model}
												</p>
											)}
											{record.serialNumber && (
												<p>
													<strong>
														{intl.formatMessage({
															id: "page.inventory.form.serialNumber.label"
														})}
														:
													</strong>{" "}
													{record.serialNumber}
												</p>
											)}
											{record.notes && (
												<p>
													<strong>
														{intl.formatMessage({
															id: "page.inventory.form.notes.label"
														})}
														:
													</strong>{" "}
													{record.notes}
												</p>
											)}
										</div>
									),
									rowExpandable: (record) =>
										!!(
											record.description ||
											record.brand ||
											record.model ||
											record.serialNumber ||
											record.notes
										)
								}}
								bordered
							/>
						) : (
							<Flex justify="center" align="center" style={{ padding: "2rem" }}>
								<Text type="secondary">
									{intl.formatMessage({ id: "component.empty.description" })}
								</Text>
							</Flex>
						)}
					</Flex>
				)}
			</Card>
			<InventoryModalForm
				visible={modalVisible}
				onCancel={handleModalCancel}
				onSubmit={handleModalSubmit}
				editingItem={editingItem}
			/>
		</>
	);
};

export default InventoryListRow;
