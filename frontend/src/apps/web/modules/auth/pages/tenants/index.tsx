import { useEffect, useState } from "react";
import { Button, Flex, Popconfirm, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { useSearchParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";

import BoardPageHeader from "../home/components/finance-bar-panel";
import PageHeaderFilters from "../../../../components/page-header-filters";
import PageHeaderActions from "../../../../components/page-header-actions";

import {
	useListTenants,
	useDeleteTenant,
	useCreateTenant,
	useUpdateTenant
} from "@web/lib/contexts/tenant/hooks";
import { Tenant } from "@core/domain/models/tenant";
import { THEME_COLORS } from "@web/config/theme";

import Table from "@web/components/table";
import { useIntl } from "react-intl";
import TenantModalForm from "@web/components/tenant-modal-form";

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
	name: css`
		color: ${THEME_COLORS.PRIMARY_COLOR};
		font-weight: 500;
		cursor: pointer;
		font-size: 16px;
		transition: color 0.2s;

		&:hover {
			color: ${THEME_COLORS.SECONDARY_COLOR};
		}
	`,
	email: css`
		font-size: 14px;
		color: #666;
	`,
	phone: css`
		font-size: 14px;
		color: #999;
	`
};

const PAGE_SIZE = 6;

const TenantsPage = () => {
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [tenants, setTenants] = useState<Tenant[]>([]);
	const [loadingTenants, setLoadingTenants] = useState(false);
	const [creatingTenant, setCreatingTenant] = useState(false);
	const [updatingTenant, setUpdatingTenant] = useState(false);
	const [isAddModalVisible, setIsAddModalVisible] = useState(false);
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [editingTenant, setEditingTenant] = useState<Tenant | undefined>(
		undefined
	);

	const intl = useIntl();
	const [searchParams, setSearchParams] = useSearchParams();

	const listTenants = useListTenants();
	const deleteTenant = useDeleteTenant();
	const createTenant = useCreateTenant();
	const updateTenant = useUpdateTenant();

	const handleFetchTenants = async () => {
		setLoadingTenants(true);
		const q = searchParams.get("q");
		const order_by = searchParams.get("order_by");
		const filters: Record<string, any> = {};
		if (q && q.trim() !== "") {
			filters["q"] = q;
		}
		if (order_by) {
			filters["order_by"] = order_by;
		}
		const response = await listTenants(filters);
		setLoadingTenants(false);
		if (response) setTenants(response);
	};

	const handleDelete = async (id: string) => {
		setLoadingTenants(true);
		await deleteTenant(id);
		setLoadingTenants(false);
		await handleFetchTenants();
	};

	const handleSearchChange = (value: string) => {
		const newParams = new URLSearchParams(searchParams);
		if (value) newParams.set("q", value);
		else newParams.delete("q");
		setSearchParams(newParams);
	};

	const handleOrderByChange = (value: string) => {
		const newParams = new URLSearchParams(searchParams);
		if (value) {
			newParams.set("order_by", value);
		} else {
			newParams.delete("order_by");
		}
		setSearchParams(newParams);
	};

	const handleAddTenant = async (values: any) => {
		const tenant = Tenant.fromForm(values);
		setCreatingTenant(true);
		await createTenant(tenant);
		setCreatingTenant(false);
		setIsAddModalVisible(false);
		await handleFetchTenants();
	};

	const handleEditTenant = async (values: any) => {
		const tenant = Tenant.fromForm(values);
		setUpdatingTenant(true);
		await updateTenant(tenant);
		setUpdatingTenant(false);
		setIsEditModalVisible(false);
		await handleFetchTenants();
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: (newSelectedRowKeys: React.Key[]) =>
			setSelectedRowKeys(newSelectedRowKeys),
		renderCell: (
			checked: boolean,
			record: Tenant,
			index: number,
			originNode: React.ReactNode
		) => <Flex style={{ marginLeft: 15 }}>{originNode}</Flex>
	};

	const tenantTableFields: ColumnsType<Tenant> = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (_, tenant) => (
				<Flex vertical>
					<span css={styles.name}>{tenant.name}</span>
					<span css={styles.email}>{tenant.email}</span>
					<span css={styles.phone}>{tenant.phone}</span>
				</Flex>
			)
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status: string) =>
				status === "active" ? (
					<Tag color="green">Active</Tag>
				) : (
					<Tag color="red">Inactive</Tag>
				)
		},
		{
			dataIndex: "actions",
			key: "actions",
			render: (_, data) => (
				<>
					<Popconfirm
						title={intl.formatMessage({ id: "general.delete.message" })}
						onConfirm={() => handleDelete(data.id)}
						okText={intl.formatMessage({ id: "general.submit" })}
						cancelText={intl.formatMessage({ id: "general.cancel" })}
					>
						<Button type="text" danger>
							<DeleteOutlined />
						</Button>
					</Popconfirm>
					<Button
						type="text"
						onClick={() => {
							setEditingTenant(data);
							setIsEditModalVisible(true);
						}}
					>
						<EditOutlined />
					</Button>
				</>
			)
		}
	];

	useEffect(() => {
		handleFetchTenants();
	}, [searchParams]);

	const orderByOptions = [
		{ key: "newest", label: "Mais recentes" },
		{ key: "oldest", label: "Mais antigos" }
	];

	return (
		<>
			<Flex css={styles.container} vertical gap={10} flex={1}>
				<BoardPageHeader
					title="Tenants"
					prefix={
						<PageHeaderFilters
							onReloadClick={handleFetchTenants}
							onSearchChange={handleSearchChange}
							searchValue={searchParams.get("q") ?? ""}
							hideSelect
						/>
					}
					extra={
						<PageHeaderActions
							onAddClick={() => setIsAddModalVisible(true)}
							onOrderByChange={handleOrderByChange}
							orderByOptions={orderByOptions}
						/>
					}
				/>
				<Table
					columns={tenantTableFields}
					dataSource={tenants}
					rowKey="id"
					pagination={{ pageSize: PAGE_SIZE }}
					rowSelection={rowSelection}
					loading={loadingTenants}
					selectedRowKeys={selectedRowKeys}
				/>
			</Flex>
			<TenantModalForm
				visible={isAddModalVisible}
				onCancel={() => setIsAddModalVisible(false)}
				onSubmit={handleAddTenant}
				loadingButton={creatingTenant}
				title="Add Tenant Form"
				formName="add-tenant-form"
			/>
			<TenantModalForm
				visible={isEditModalVisible}
				onCancel={() => {
					setEditingTenant(undefined);
					setIsEditModalVisible(false);
				}}
				onSubmit={handleEditTenant}
				loadingButton={updatingTenant}
				title="Edit Tenant Form"
				formName="edit-tenant-form"
				tenant={editingTenant}
			/>
		</>
	);
};

TenantsPage.route = "/tenants";

export default TenantsPage;
