import { useEffect, useState } from "react";
import { Button, Empty, Flex, Popconfirm, Table, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { css, Global } from "@emotion/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";

import BoardPageHeader from "../home/components/finance-bar-panel";
import PageHeaderFilters from "./components/page-header-filters";
import PageHeaderActions from "./components/page-header-actions";

import {
	useCreateProperty,
	useDeleteProperty,
	useListProperties
} from "@web/lib/contexts/property/hooks";
import { Property } from "@core/domain/models/property";
import { THEME_COLORS } from "@web/config/theme";
import AddPropertyModalForm from "./components/add-property-modal-form";

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
	`,
	text: css`
		font-size: 14px;
	`
};

const PAGE_SIZE = 6;

const PropertiesPage = () => {
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [properties, setProperties] = useState<Property[]>([]);
	const [loadingProperties, setLoadingProperties] = useState<boolean>(false);
	const [creatingProperty, setCreatingProperty] = useState<boolean>(false);
	const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);

	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const listProperties = useListProperties();
	const deleteProperty = useDeleteProperty();
	const createProperty = useCreateProperty();

	const handleFetchProperties = async () => {
		setLoadingProperties(true);

		const q = searchParams.get("q") ?? "";
		const order_by = searchParams.get("order_by") ?? "newest";

		const response = await listProperties({ q, order_by });

		setLoadingProperties(false);
		if (response) {
			setProperties(response);
		}
	};

	const handleDelete = async (id: string) => {
		await deleteProperty(id);
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
		) => <div style={{ marginLeft: 15 }}>{originNode}</div>
	};

	const tableFields: ColumnsType<Property> = [
		{
			title: "Title",
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
					<p css={[styles.clearWhiteSpaces, styles.text]}>{data.description}</p>
				</Flex>
			),
			width: "30%"
		},
		{
			title: "Bedrooms",
			dataIndex: "bedrooms",
			key: "bedrooms"
		},
		{
			title: "Bathrooms",
			dataIndex: "bathrooms",
			key: "bathrooms"
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status"
		},
		{
			title: "Surface",
			dataIndex: "surface",
			key: "surface",
			render: (value: number) => `${value}m²`
		},
		{
			title: "Rent Price",
			dataIndex: "rent",
			key: "rent",
			render: (value: number) =>
				new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD"
				}).format(value)
		},
		{
			title: "Furnished",
			dataIndex: "furnished",
			key: "furnished",
			render: (value: boolean) =>
				value ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>
		},
		{
			title: "Delete",
			dataIndex: "delete",
			key: "delete",
			render: (_, { id }) => (
				<Popconfirm
					title="Do you want to delete it?"
					onConfirm={() => handleDelete(id)}
					okText="Submit"
					cancelText="Cancel"
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
			<Global
				styles={css`
					.ant-table-thead .ant-table-selection-column .ant-checkbox-wrapper {
						margin-left: 15px;
					}
				`}
			/>
			<Flex css={styles.container} vertical gap={10} flex={1}>
				<BoardPageHeader
					title="Properties"
					prefix={
						<PageHeaderFilters
							onReloadClick={handleFetchProperties}
							onSearchChange={handleSearchChange}
							searchValue={searchParams.get("q") ?? ""}
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
					columns={tableFields}
					dataSource={properties}
					rowKey="id"
					pagination={{ pageSize: PAGE_SIZE }}
					rowSelection={rowSelection}
					loading={loadingProperties}
					locale={{ emptyText: <Empty description="No properties found" /> }}
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
