import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { css } from "@emotion/react";
import { Button, Card, Col, Flex, Popconfirm, Row, Tag, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

import { ColumnsType } from "antd/es/table";

import Table from "@web/components/table";
import BoardPageHeader from "../../../home/components/finance-bar-panel";

import { RentContract } from "@core/domain/models/rent-contract";
import {
	useCreateContract,
	useDeleteContract,
	useUpdateContract
} from "@web/lib/contexts/rent-contract/hooks";
import TableHeader from "./components/table-header";
import { THEME_COLORS } from "@web/config/theme";
import { useListPropertyContracts } from "@web/lib/contexts/property/hooks";
import { useListTenants } from "@web/lib/contexts/tenant/hooks";
import RentContractModalForm from "@web/components/rent-contract-modal-form";
import { Tenant } from "@core/domain/models/tenant";
import EmptySection from "@web/components/empty-section";
import { Pagination } from "@core/domain/models/pagination";

const styles = {
	container: css`
		border-radius: 6px;
	`,
	addButton: css`
		width: 35px;
		height: 35px;
		background-color: ${THEME_COLORS.PRIMARY_COLOR};
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		box-shadow: none !important;

		&:hover,
		&:focus {
			background-color: ${THEME_COLORS.PRIMARY_COLOR};
			opacity: 0.9;
		}
	`
};

const ContractListRow = () => {
	const intl = useIntl();
	const { id: propertyId } = useParams<{ id: string }>();
	const [currentPage, setCurrentPage] = useState(1);

	if (!propertyId) {
		return <>{intl.formatMessage({ id: "page.property.not-found" })}</>;
	}

	const listContracts = useListPropertyContracts();
	const deleteContract = useDeleteContract();
	const createContract = useCreateContract();
	const updateContract = useUpdateContract();
	const listTenants = useListTenants();

	const [paginationContract, setPaginationContract] = useState<
		Pagination<RentContract>
	>(Pagination.empty<RentContract>());
	const [createModalVisible, setCreateModalVisible] = useState(false);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [editingContract, setEditingContract] = useState<
		RentContract | undefined
	>(undefined);
	const [tenants, setTenants] = useState<Tenant[]>([]);
	const [archivedSwitchValue, setArchivedSwitchValue] =
		useState<boolean>(false);

	const [loading, setLoading] = useState({
		create: false,
		update: false,
		delete: false,
		list: false
	});

	const handleList = async (archived: boolean, page?: number) => {
		setArchivedSwitchValue(archived);
		if (!propertyId) return;
		const currentPage = page || 1;
		setLoading((prev) => ({ ...prev, list: true }));
		const response = await listContracts(propertyId, archived, currentPage);
		setLoading((prev) => ({ ...prev, list: false }));
		setPaginationContract(response);
	};

	const handleDelete = async (id: string) => {
		setLoading((prev) => ({ ...prev, delete: true }));
		await deleteContract(id);
		setLoading((prev) => ({ ...prev, delete: false }));
		handleList(archivedSwitchValue);
	};

	const handleAdd = async (values: any) => {
		const contract = RentContract.fromForm({ ...values, property: propertyId });
		setLoading((prev) => ({ ...prev, create: true }));
		await createContract(contract);
		setLoading((prev) => ({ ...prev, create: false }));
		setCreateModalVisible(false);
		handleList(archivedSwitchValue);
	};

	const handleUpdate = async (values: any) => {
		if (!editingContract) return;
		const contract = RentContract.fromForm({ ...values, property: propertyId });
		setLoading((prev) => ({ ...prev, update: true }));
		await updateContract(contract);
		setLoading((prev) => ({ ...prev, update: false }));
		setEditModalVisible(false);
		setEditingContract(undefined);
		handleList(archivedSwitchValue);
	};

	const handleListTenants = async () => {
		const response = await listTenants();
		setTenants(response);
	};

	const openCreateModal = async () => {
		setCreateModalVisible(true);
	};

	const openEditModal = async (contract: RentContract) => {
		setEditingContract(contract);
		setEditModalVisible(true);
	};

	const contractColumns: ColumnsType<RentContract> = [
		{
			title: intl.formatMessage({ id: "page.property.contracts.table.tenant" }),
			dataIndex: "tenant",
			key: "tenant",
			width: 150,
			render: (_, contract) => {
				const tenant = tenants.find((tenant) => tenant.id === contract.tenant);
				return <p>{tenant ? tenant.name : "-"}</p>;
			}
		},
		{
			title: intl.formatMessage({ id: "page.property.contracts.table.status" }),
			dataIndex: "archived",
			key: "archived",
			width: 150,
			render: (_, contract) => {
				return (
					<Tag color={contract.archived ? "warning" : "green"}>
						{contract.archived
							? intl.formatMessage({
									id: "page.property.contracts.status.archived"
								})
							: intl.formatMessage({
									id: "page.property.contracts.status.in-progress"
								})}
					</Tag>
				);
			}
		},
		{
			title: intl.formatMessage({
				id: "page.property.contracts.table.start-date"
			}),
			dataIndex: "startDate",
			key: "startDate",
			width: 150,
			render: (_, contract) => (
				<p>{new Date(contract.startedAt).toLocaleDateString()}</p>
			)
		},
		{
			title: intl.formatMessage({
				id: "page.property.contracts.table.end-date"
			}),
			dataIndex: "endDate",
			key: "endDate",
			width: 150,
			render: (_, contract) => (
				<p>{new Date(contract.finishAt).toLocaleDateString()}</p>
			)
		},
		{
			title: intl.formatMessage({
				id: "page.property.contracts.table.deposit"
			}),
			dataIndex: "deposit",
			key: "deposit",
			width: 150,
			render: (_, contract) =>
				new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD"
				}).format(contract.deposit)
		},
		{
			title: intl.formatMessage({
				id: "page.property.contracts.table.payments-date"
			}),
			dataIndex: "payments_date",
			key: "payments_date",
			width: 150,
			render: (_, contract) => {
				if (!contract.paymentsDate) return "-";

				const date = new Date(contract.paymentsDate);
				const day = date.getDate();

				const getDaySuffix = (d: number) => {
					if (d >= 11 && d <= 13) return "th";
					switch (d % 10) {
						case 1:
							return "st";
						case 2:
							return "nd";
						case 3:
							return "rd";
						default:
							return "th";
					}
				};

				const suffix = getDaySuffix(day);
				return intl.formatMessage(
					{ id: "page.property.contracts.payments-date.format" },
					{ day: `${day}${suffix}` }
				);
			}
		},
		{
			dataIndex: "actions",
			key: "actions",
			width: 100,
			render: (_, contract) => (
				<Flex justify="center" align="center" gap={10}>
					<Popconfirm
						title={intl.formatMessage({
							id: "page.property.contracts.delete.confirm"
						})}
						onConfirm={() => handleDelete(contract.id)}
						okText={intl.formatMessage({ id: "general.submit" })}
						cancelText={intl.formatMessage({ id: "general.cancel" })}
						placement="left"
					>
						<Button type="text" danger icon={<DeleteOutlined />} />
					</Popconfirm>
					<Button
						type="text"
						icon={<EditOutlined />}
						onClick={() => openEditModal(contract)}
					/>
				</Flex>
			)
		}
	];

	useEffect(() => {
		handleList(archivedSwitchValue);
		handleListTenants();
	}, []);

	return (
		<Card loading={loading.list}>
			{paginationContract.total === 0 ? (
				<EmptySection
					entity={intl.formatMessage({ id: "page.payments.table.contract" })}
					onSubmit={() => setCreateModalVisible(true)}
				/>
			) : (
				<Row gutter={24}>
					<Col span={24}>
						<Flex css={styles.container} vertical gap={10}>
							<BoardPageHeader
								title={intl.formatMessage({
									id: "page.property.contracts.title"
								})}
								prefix={
									<TableHeader
										onSelectCheckboxOption={handleList}
										initialValue={archivedSwitchValue}
										hideActions={paginationContract.total < 1}
									/>
								}
								extra={
									<Tooltip
										title={intl.formatMessage({
											id: "component.page-header-actions.tooltip.add"
										})}
									>
										<Button
											type="primary"
											icon={<PlusOutlined />}
											onClick={openCreateModal}
											css={styles.addButton}
										/>
									</Tooltip>
								}
							/>
							{paginationContract?.total >= 1 ? (
								<Table
									columns={contractColumns}
									dataSource={paginationContract.items}
									rowKey="id"
									pagination={{
										current: currentPage,
										pageSize: paginationContract.pageSize,
										total: paginationContract.count,
										onChange: (page) => {
											setCurrentPage(page);
											handleList(archivedSwitchValue, page);
										}
									}}
									scroll={{ x: "max-content" }}
									loading={
										loading.create ||
										loading.update ||
										loading.delete ||
										loading.list
									}
									size="small"
									bordered
								/>
							) : null}
						</Flex>
					</Col>
				</Row>
			)}

			<RentContractModalForm
				visible={createModalVisible}
				loadingButton={loading.create}
				onCancel={() => setCreateModalVisible(false)}
				onSubmit={handleAdd}
				tenants={tenants}
				title={intl.formatMessage({
					id: "page.property.contracts.modal.create.title"
				})}
				formName="rent_contract_create_form"
				loading={
					loading.create || loading.update || loading.delete || loading.list
				}
			/>

			<RentContractModalForm
				visible={editModalVisible}
				loadingButton={loading.update}
				onCancel={() => {
					setEditingContract(undefined);
					setEditModalVisible(false);
				}}
				onSubmit={handleUpdate}
				contract={editingContract}
				tenants={tenants}
				title={intl.formatMessage({
					id: "page.property.contracts.modal.edit.title"
				})}
				formName="rent_contract_edit_form"
				loading={
					loading.create || loading.update || loading.delete || loading.list
				}
			/>
		</Card>
	);
};

export default ContractListRow;
