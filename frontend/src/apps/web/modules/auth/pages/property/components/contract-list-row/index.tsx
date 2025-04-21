import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { css } from "@emotion/react";
import {
	Button,
	Card,
	Col,
	Empty,
	Flex,
	Popconfirm,
	Row,
	Tag,
	Tooltip
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

import { ColumnsType } from "antd/es/table";

import Table from "@web/components/table";
import PageHeaderFilters from "@web/components/page-header-filters";
import PageHeaderActions from "@web/components/page-header-actions";
import BoardPageHeader from "../../../home/components/finance-bar-panel";

import useCheckOrderByParam from "@web/lib/hooks/params/use-check-order-by-param";
import { RentContract } from "@core/domain/models/rent-contract";
import {
	useCreateContract,
	useDeleteContract,
	useUpdateContract
} from "@web/lib/contexts/rent-contract/hooks";
import TableHeader from "./components/table-header";
import { THEME_COLORS } from "@web/config/theme";
import { useListContracts } from "@web/lib/contexts/property/hooks";
import { useListTenants } from "@web/lib/contexts/tenant/hooks";
import RentContractModalForm from "@web/components/rent-contract-modal-form";
import { Tenant } from "@core/domain/models/tenant";
import EmptySection from "@web/components/empty-section";

const PAGE_SIZE = 5;

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
	if (!propertyId) {
		return <>Property not found</>;
	}

	const listContracts = useListContracts();
	const deleteContract = useDeleteContract();
	const createContract = useCreateContract();
	const updateContract = useUpdateContract();
	const listTenants = useListTenants();

	const [contracts, setContracts] = useState<RentContract[]>([]);
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

	const handleList = async (archived: boolean) => {
		setArchivedSwitchValue(archived);
		if (!propertyId) return;
		setLoading((prev) => ({ ...prev, list: true }));
		const response = await listContracts(propertyId, archived);
		setLoading((prev) => ({ ...prev, list: false }));
		setContracts(response);
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
			title: "Tenant",
			dataIndex: "tenant",
			key: "tenant",
			width: 150,
			render: (_, contract) => {
				const tenant = tenants.find((tenant) => tenant.id === contract.tenant);
				return <p>{tenant ? tenant.name : "-"}</p>;
			}
		},
		{
			title: "Status",
			dataIndex: "archived",
			key: "archived",
			width: 150,
			render: (_, contract) => {
				return (
					<Tag color={contract.archived ? "warning" : "green"}>
						{contract.archived ? "Archived" : "In Progress"}
					</Tag>
				);
			}
		},
		{
			title: "Start Date",
			dataIndex: "startDate",
			key: "startDate",
			width: 150,
			render: (_, contract) => (
				<p>{new Date(contract.startedAt).toLocaleDateString()}</p>
			)
		},
		{
			title: "End Date",
			dataIndex: "endDate",
			key: "endDate",
			width: 150,
			render: (_, contract) => (
				<p>{new Date(contract.finishAt).toLocaleDateString()}</p>
			)
		},
		{
			title: "First Deposit",
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
			title: "Payments Date",
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
				return `Every ${day}${suffix}`;
			}
		},
		{
			dataIndex: "actions",
			key: "actions",
			width: 100,
			render: (_, contract) => (
				<Flex justify="center" align="center" gap={10}>
					<Popconfirm
						title="Are you sure to delete this contract?"
						onConfirm={() => handleDelete(contract.id)}
						okText="Submit"
						cancelText="Cancel"
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
			<Row gutter={24}>
				<Col span={24}>
					<Flex css={styles.container} vertical gap={10}>
						<BoardPageHeader
							title="Contracts"
							prefix={
								<TableHeader
									onSelectCheckboxOption={handleList}
									initialValue={archivedSwitchValue}
									hideActions={contracts.length < 1}
								/>
							}
							extra={
								contracts.length >= 1 ? (
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
								) : (
									<EmptySection
										onSubmit={openCreateModal}
										okText="Cadastrar um contrato"
										descriptionText="Ainda não há contratos cadastrados"
									/>
								)
							}
						/>
						{contracts.length >= 1 && (
							<Table
								columns={contractColumns}
								dataSource={contracts}
								rowKey="id"
								pagination={{ pageSize: PAGE_SIZE }}
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
						)}
					</Flex>
				</Col>
			</Row>

			<RentContractModalForm
				visible={createModalVisible}
				loadingButton={loading.create}
				onCancel={() => setCreateModalVisible(false)}
				onSubmit={handleAdd}
				tenants={tenants}
				title="Create Rent Contract"
				formName="rent_contract_create_form"
				loading={
					loading.create || loading.update || loading.delete || loading.list
				}
			/>

			<RentContractModalForm
				visible={editModalVisible}
				loadingButton={loading.update}
				onCancel={() => {
					setEditModalVisible(false);
					setEditingContract(undefined);
				}}
				onSubmit={handleUpdate}
				tenants={tenants}
				contract={editingContract}
				title="Edit Rent Contract"
				formName="rent_contract_edit_form"
				loading={
					loading.create || loading.update || loading.delete || loading.list
				}
			/>
		</Card>
	);
};

export default ContractListRow;
