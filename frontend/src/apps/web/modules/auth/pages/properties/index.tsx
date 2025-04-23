import { useEffect, useState } from "react";
import { Button, Flex, Popconfirm, Tag, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";

import BoardPageHeader from "../home/components/finance-bar-panel";
import PageHeaderFilters from "../../../../components/page-header-filters";
import PageHeaderActions from "../../../../components/page-header-actions";
import {
	useCreateProperty,
	useDeleteProperty,
	useListProperties,
	useUpdateProperty
} from "@web/lib/contexts/property/hooks";
import { Property } from "@core/domain/models/property";
import { THEME_COLORS } from "@web/config/theme";
import PropertyModalForm from "../../../../components/property-modal-form";
import Table from "@web/components/table";
import { useIntl } from "react-intl";
import { Pagination } from "@core/domain/models/pagination";

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
		font-weight: 500;
		cursor: pointer;
		font-size: 16px;
		transition: color 0.2s;

		&:hover {
			color: ${THEME_COLORS.SECONDARY_COLOR};
		}
	`,
	location: css`
		font-size: 14px;
		color: #666;
	`,
	description: css`
		font-size: 14px;
		color: #999;
	`
};

const INITIAL_TABLE_PAGE = 1;

const PropertiesPage = () => {
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [loadingProperties, setLoadingProperties] = useState<boolean>(false);
	const [creatingProperty, setCreatingProperty] = useState<boolean>(false);
	const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
	const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
	const [editingProperty, setEditingProperty] = useState<Property | undefined>(
		undefined
	);

	const [propertyPagination, setPropertyPagination] = useState<
		Pagination<Property>
	>(Pagination.empty<Property>());

	const intl = useIntl();
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const listProperties = useListProperties();
	const deleteProperty = useDeleteProperty();
	const createProperty = useCreateProperty();
	const updateProperty = useUpdateProperty();

	const getValidPage = () => {
		const pageParam = searchParams.get("page");
		const parsedPage = Number(pageParam);
		return isNaN(parsedPage) || parsedPage < INITIAL_TABLE_PAGE
			? INITIAL_TABLE_PAGE
			: parsedPage;
	};
	const handleFetchProperties = async (page?: number) => {
		setLoadingProperties(true);

		const rawQuery = searchParams.get("q");
		const q = rawQuery && rawQuery.trim() !== "" ? rawQuery.trim() : undefined;
		const order_by = searchParams.get("order_by") ?? "newest";
		const furnishedParam = searchParams.get("furnished");

		const furnished =
			furnishedParam === "true"
				? true
				: furnishedParam === "false"
					? false
					: undefined;

		const shouldResetPage = Boolean(furnished) || Boolean(q);
		const currentPage = shouldResetPage ? 1 : (page ?? getValidPage());

		const response = await listProperties({
			q,
			order_by,
			furnished,
			page: currentPage
		});

		if (response) {
			const totalPages = Math.ceil(response.count / response.pageSize);

			if (currentPage > totalPages) {
				setSearchParams({ ...searchParams, page: "1" });
			}

			setPropertyPagination(response);
			setLoadingProperties(false);

			const newParams = new URLSearchParams(searchParams);
			newParams.set("page", String(currentPage));
			setSearchParams(newParams);
		} else {
			setLoadingProperties(false);
		}
	};

	const handleDelete = async (id: string) => {
		setLoadingProperties(true);
		await deleteProperty(id);
		setLoadingProperties(false);
		await handleFetchProperties(1);
	};

	const handleUpdate = async (values: any) => {
		const property = Property.fromForm(values);
		await updateProperty(property);
		handleCloseEditModal();
		await handleFetchProperties(1);
	};

	const handleOpenEditModal = (property: Property) => {
		setEditingProperty(property);
		setIsEditModalVisible(true);
	};

	const handleCloseEditModal = () => {
		setEditingProperty(undefined);
		setIsEditModalVisible(false);
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
		await handleFetchProperties(1);
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
				<Tooltip title="Property Code" placement="bottom">
					<p style={{ fontSize: "14px", margin: 0 }}>{record.formattedCode}</p>
				</Tooltip>
			</Flex>
		)
	};

	const propertyTableFields: ColumnsType<Property> = [
		{
			dataIndex: "title",
			key: "title",
			render: (_, data: Property) => (
				<Flex vertical>
					<span
						css={styles.title}
						onClick={() => navigate(`/properties/${data.id}`)}
					>
						{data.title}
					</span>
					<span css={styles.location}>{data.location}</span>
					<span css={styles.description}>{data.description}</span>
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
				<Tag>{value.charAt(0).toLocaleUpperCase() + value.slice(1)}</Tag>
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
			dataIndex: "actions",
			key: "actions",
			render: (_, property: Property) => (
				<Flex gap={10}>
					<Popconfirm
						title={intl.formatMessage({ id: "general.delete.message" })}
						onConfirm={() => handleDelete(property.id)}
						okText={intl.formatMessage({ id: "general.submit" })}
						cancelText={intl.formatMessage({ id: "general.cancel" })}
						placement="left"
					>
						<Button type="text" danger icon={<DeleteOutlined />} />
					</Popconfirm>
					<Button
						type="text"
						icon={<EditOutlined />}
						onClick={() => handleOpenEditModal(property)}
					/>
				</Flex>
			)
		}
	];

	useEffect(() => {
		handleFetchProperties();
	}, [searchParams]);

	const orderByOptions = [
		{ key: "newest", label: "Mais recentes" },
		{ key: "oldest", label: "Mais antigos" },
		{ key: "price_high", label: "Maior preço" },
		{ key: "price_low", label: "Menor preço" },
		{ key: "most_bedrooms", label: "Mais quartos" },
		{ key: "less_bedrooms", label: "Menos quartos" },
		{ key: "most_bathrooms", label: "Mais banheiros" },
		{ key: "less_bathrooms", label: "Menos banheiros" }
	];

	return (
		<>
			<Flex css={styles.container} vertical gap={10} flex={1}>
				<BoardPageHeader
					title={intl.formatMessage({
						id: "page.properties.board-page-header.title"
					})}
					prefix={
						<PageHeaderFilters
							onReloadClick={() => handleFetchProperties(1)}
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
							orderByOptions={orderByOptions}
						/>
					}
				/>
				<Table
					loading={loadingProperties}
					rowSelection={rowSelection}
					dataSource={propertyPagination?.items}
					columns={propertyTableFields}
					rowKey={(record) => record.id}
					pagination={{
						current: propertyPagination.page,
						pageSize: propertyPagination.pageSize,
						total: propertyPagination.count,
						onChange: (page) => {
							handleFetchProperties(page);
						}
					}}
				/>
			</Flex>
			<PropertyModalForm
				visible={isAddModalVisible}
				onCancel={handleCloseAddModal}
				onSubmit={handleAddProperty}
				loadingButton={creatingProperty}
				title="Add new property"
			/>

			<PropertyModalForm
				visible={isEditModalVisible}
				onCancel={handleCloseEditModal}
				onSubmit={handleUpdate}
				property={editingProperty}
				loadingButton={false}
				title="Edit the property"
			/>
		</>
	);
};

PropertiesPage.route = "/properties";

export default PropertiesPage;
