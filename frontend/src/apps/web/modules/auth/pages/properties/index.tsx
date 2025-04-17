import { useEffect, useState } from "react";
import { Button, Flex, Popconfirm, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";

import BoardPageHeader from "../home/components/finance-bar-panel";
import PageHeaderFilters from "../../../../components/page-header-filters";
import PageHeaderActions from "../../../../components/page-header-actions";

import {
	useCreateProperty,
	useDeleteProperty,
	useListProperties
} from "@web/lib/contexts/property/hooks";
import { Property } from "@core/domain/models/property";
import { THEME_COLORS } from "@web/config/theme";
import AddPropertyModalForm from "../../../../components/add-property-modal-form";

import Table from "@web/components/table";
import { useIntl } from "react-intl";

const styles = {
	container: css`
		padding-inline: 2rem;
		padding-block: 1rem;
		background-color: ${THEME_COLORS.GRAY_COLOR};
		min-height: calc(100vh - 4rem - 36px);
	`,
	clearWhiteSpaces: css`
		padding: 0;
		margin: 0;
	`,
	title: css`
		color: ${THEME_COLORS.PRIMARY_COLOR};
		cursor: pointer;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	`,

	text: css`
		font-size: 14px;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	`,
	location: css`
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		font-weight: 500;
		font-size: 15px;
	`
};

const PAGE_SIZE = 6;

const PropertiesPage = () => {
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [properties, setProperties] = useState<Property[]>([]);
	const [loadingProperties, setLoadingProperties] = useState<boolean>(false);
	const [creatingProperty, setCreatingProperty] = useState<boolean>(false);
	const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);

	const intl = useIntl();

	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const listProperties = useListProperties();
	const deleteProperty = useDeleteProperty();
	const createProperty = useCreateProperty();

	const handleFetchProperties = async () => {
		setLoadingProperties(true);
		const q = searchParams.get("q") ?? "";
		const order_by = searchParams.get("order_by") ?? "newest";
		const furnishedParam = searchParams.get("furnished");
		const furnished =
			furnishedParam === "true"
				? true
				: furnishedParam === "false"
					? false
					: undefined;
		const response = await listProperties({ q, order_by, furnished });
		setLoadingProperties(false);
		if (response) {
			setProperties(response);
		}
	};

	const handleDelete = async (id: string) => {
		setLoadingProperties(true);
		await deleteProperty(id);
		setLoadingProperties(false);
		await handleFetchProperties();
	};

	const handleOpenAddModal = () => {
		setIsAddModalVisible(true);
	};

	const handleCloseAddModal = () => {
		setIsAddModalVisible(false);
	};

	const handleAddProperty = async (values: any) => {
		const property = Property.fromForm(values);
		setCreatingProperty(true);
		await createProperty(property);
		setCreatingProperty(false);
		handleCloseAddModal();
		await handleFetchProperties();
	};

	const handleSearchChange = (value: string) => {
		const newParams = new URLSearchParams(searchParams);
		if (value) {
			newParams.set("q", value);
		} else {
			newParams.delete("q");
		}
		setSearchParams(newParams);
	};

	const handleFurnishedChange = (value: string) => {
		const newParams = new URLSearchParams(searchParams);
		if (value) {
			newParams.set("furnished", value);
		} else {
			newParams.delete("furnished");
		}
		setSearchParams(newParams);
	};

	const handleOrderChange = (value: string) => {
		const newParams = new URLSearchParams(searchParams);
		if (value) {
			newParams.set("order_by", value);
		} else {
			newParams.delete("order_by");
		}
		setSearchParams(newParams);
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: (newSelectedRowKeys: React.Key[]) => {
			setSelectedRowKeys(newSelectedRowKeys);
		},
		renderCell: (
			checked: boolean,
			record: Property,
			index: number,
			originNode: React.ReactNode
		) => (
			<Flex
				style={{ marginLeft: 15 }}
				vertical
				justify="center"
				align="center"
				gap={5}
			>
				{originNode}
				<p style={{ fontSize: "14px", margin: 0 }}>{record.formattedCode}</p>
			</Flex>
		)
	};

	const propertyTableFields: ColumnsType<Property> = [
		{
			title: intl.formatMessage({ id: "page.properties.table.item.title" }),
			dataIndex: "title",
			key: "title",
			render: (_, data: Property) => (
				<Flex vertical>
					<h4
						css={[styles.clearWhiteSpaces, styles.title]}
						onClick={() => {
							navigate(`/properties/${data.id}`);
						}}
					>
						{data.title}
					</h4>
					<p css={[styles.clearWhiteSpaces, styles.location]}>
						{data.location}
					</p>
					<p css={[styles.clearWhiteSpaces, styles.text]}>{data.description}</p>
				</Flex>
			),
			width: "30%"
		},
		{
			title: intl.formatMessage({ id: "page.properties.table.item.bedrooms" }),
			dataIndex: "bedrooms",
			key: "bedrooms",
			width: "40px"
		},
		{
			title: intl.formatMessage({ id: "page.properties.table.item.bathrooms" }),
			dataIndex: "bathrooms",
			key: "bathrooms",
			width: "40px"
		},
		{
			title: intl.formatMessage({ id: "page.properties.table.item.status" }),
			dataIndex: "status",
			key: "status",
			render: (value: string) => (
				<Tag>
					{value.charAt(0).toLocaleUpperCase() + value.replace(value[0], "")}
				</Tag>
			)
		},
		{
			title: intl.formatMessage({ id: "page.properties.table.item.surface" }),
			dataIndex: "surface",
			key: "surface",
			render: (value: number) => `${value}m²`
		},
		{
			title: intl.formatMessage({
				id: "page.properties.table.item.rent-price"
			}),
			dataIndex: "rent",
			key: "rent",
			render: (value: number) =>
				new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD"
				}).format(value)
		},
		{
			title: intl.formatMessage({ id: "page.properties.table.item.furnished" }),
			dataIndex: "furnished",
			key: "furnished",
			render: (value: boolean) =>
				value ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>
		},
		{
			title: intl.formatMessage({ id: "page.properties.table.item.delete" }),
			dataIndex: "delete",
			key: "delete",
			render: (_, { id }) => (
				<Popconfirm
					title={intl.formatMessage({ id: "general.delete.message" })}
					onConfirm={() => handleDelete(id)}
					okText={intl.formatMessage({ id: "general.submit" })}
					cancelText={intl.formatMessage({ id: "general.cancel" })}
					placement="left"
				>
					<Button type="text" danger>
						<DeleteOutlined />
					</Button>
				</Popconfirm>
			)
		}
	];

	useEffect(() => {
		handleFetchProperties();
	}, [searchParams]);

	useEffect(() => {
		const orderByParam = searchParams.get("order_by");
		if (!orderByParam) {
			const newParams = new URLSearchParams(searchParams);
			newParams.set("order_by", "newest");
			setSearchParams(newParams);
		}
	}, []);

	return (
		<>
			<Flex css={styles.container} vertical gap={10} flex={1}>
				<BoardPageHeader
					title={intl.formatMessage({
						id: "page.properties.board-page-header.title"
					})}
					prefix={
						<PageHeaderFilters
							onReloadClick={handleFetchProperties}
							onSearchChange={handleSearchChange}
							onSelectChange={handleFurnishedChange}
							searchValue={searchParams.get("q") ?? ""}
							selectValue={searchParams.get("furnished") ?? ""}
							selectPlaceholder={intl.formatMessage({
								id: "page.properties.page-header-filters.select.placeholder"
							})}
							searchPlaceholder={intl.formatMessage({
								id: "page.properties.page-header-filters.search.placeholder"
							})}
						/>
					}
					extra={
						<PageHeaderActions
							onAddClick={handleOpenAddModal}
							onOrderByChange={handleOrderChange}
						/>
					}
				/>
				<Table
					columns={propertyTableFields}
					dataSource={properties}
					rowKey="id"
					pagination={{ pageSize: PAGE_SIZE }}
					rowSelection={rowSelection}
					loading={loadingProperties}
					selectedRowKeys={selectedRowKeys}
				/>
			</Flex>
			<AddPropertyModalForm
				visible={isAddModalVisible}
				onCancel={handleCloseAddModal}
				onSubmit={handleAddProperty}
				loadingButton={creatingProperty}
			/>
		</>
	);
};

PropertiesPage.route = "/properties";

export default PropertiesPage;
