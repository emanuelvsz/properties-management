import { useEffect, useState } from "react";
import { Button, Flex, Popconfirm, Tag, Select, DatePicker } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { useSearchParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { useIntl } from "react-intl";

import BoardPageHeader from "../home/components/finance-bar-panel";
import PageHeaderFilters from "../../../../components/page-header-filters";
import PageHeaderActions from "../../../../components/page-header-actions";
import { THEME_COLORS } from "@web/config/theme";
import Table from "@web/components/table";
import { RentPayment } from "@core/domain/models/rent-payment";

const { Option } = Select;

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
	amount: css`
		color: ${THEME_COLORS.PRIMARY_COLOR};
		font-weight: 500;
		font-size: 16px;
	`,
	contract: css`
		font-size: 14px;
		color: #666;
	`,
	description: css`
		font-size: 14px;
		color: #999;
	`
};

const PAGE_SIZE = 10;

const PaymentsPage = () => {
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [payments, setPayments] = useState<RentPayment[]>([]);
	const [loadingPayments, setLoadingPayments] = useState(false);
	const [creatingPayment, setCreatingPayment] = useState(false);
	const [updatingPayment, setUpdatingPayment] = useState(false);
	const [isAddModalVisible, setIsAddModalVisible] = useState(false);
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [editingPayment, setEditingPayment] = useState<RentPayment | undefined>(
		undefined
	);

	const intl = useIntl();
	const [searchParams, setSearchParams] = useSearchParams();

	const mockPayments: RentPayment[] = [
		new RentPayment(
			"1",
			"contract-1",
			1500,
			"2024-01-15",
			"paid",
			"January rent payment"
		),
		new RentPayment(
			"2",
			"contract-2",
			1200,
			"2024-01-20",
			"pending",
			"February rent payment"
		),
		new RentPayment(
			"3",
			"contract-1",
			1500,
			"2024-02-15",
			"paid",
			"February rent payment"
		),
		new RentPayment(
			"4",
			"contract-3",
			1800,
			"2024-02-10",
			"overdue",
			"January rent payment"
		)
	];

	const handleFetchPayments = async () => {
		setLoadingPayments(true);
		setTimeout(() => {
			setPayments(mockPayments);
			setLoadingPayments(false);
		}, 500);
	};

	const handleDelete = async (id: string) => {
		setLoadingPayments(true);
		setTimeout(() => {
			setPayments(payments.filter((p) => p.id !== id));
			setLoadingPayments(false);
		}, 500);
	};

	const handleSearchChange = (value: string) => {
		const newParams = new URLSearchParams(searchParams);
		if (value) newParams.set("q", value);
		else newParams.delete("q");
		setSearchParams(newParams);
	};

	const handleStatusChange = (value: string) => {
		const newParams = new URLSearchParams(searchParams);
		if (value) newParams.set("status", value);
		else newParams.delete("status");
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

	const handleAddPayment = async (values: any) => {
		setCreatingPayment(true);
		setTimeout(() => {
			const newPayment = new RentPayment(
				Date.now().toString(),
				values.contract_id,
				values.amount,
				values.payment_date,
				values.status,
				values.description
			);
			setPayments([...payments, newPayment]);
			setCreatingPayment(false);
			setIsAddModalVisible(false);
		}, 500);
	};

	const handleEditPayment = async (values: any) => {
		if (!editingPayment) return;
		setUpdatingPayment(true);
		setTimeout(() => {
			const updatedPayment = new RentPayment(
				editingPayment.id,
				values.contract_id,
				values.amount,
				values.payment_date,
				values.status,
				values.description
			);
			setPayments(
				payments.map((p) => (p.id === editingPayment.id ? updatedPayment : p))
			);
			setUpdatingPayment(false);
			setIsEditModalVisible(false);
			setEditingPayment(undefined);
		}, 500);
	};

	const openEditModal = (payment: RentPayment) => {
		setEditingPayment(payment);
		setIsEditModalVisible(true);
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: (newSelectedRowKeys: React.Key[]) => {
			setSelectedRowKeys(newSelectedRowKeys);
		}
	};

	const paymentTableFields: ColumnsType<RentPayment> = [
		{
			dataIndex: "amount",
			key: "amount",
			render: (_, data: RentPayment) => (
				<Flex vertical>
					<span css={styles.amount}>
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD"
						}).format(data.amount)}
					</span>
					<span css={styles.contract}>
						{intl.formatMessage({ id: "page.payments.table.contract" })} #
						{data.contractId}
					</span>
					<span css={styles.description}>{data.description}</span>
				</Flex>
			),
			width: "30%"
		},
		{
			title: intl.formatMessage({ id: "page.payments.table.payment-date" }),
			dataIndex: "paymentDate",
			key: "paymentDate",
			width: "150px",
			render: (value: string) => <p>{new Date(value).toLocaleDateString()}</p>
		},
		{
			title: intl.formatMessage({ id: "page.payments.table.status" }),
			dataIndex: "status",
			key: "status",
			width: "120px",
			render: (value: string) => {
				const statusConfig = {
					paid: { color: "green", text: "page.payments.status.paid" },
					pending: { color: "orange", text: "page.payments.status.pending" },
					overdue: { color: "red", text: "page.payments.status.overdue" },
					cancelled: {
						color: "default",
						text: "page.payments.status.cancelled"
					}
				};
				const config = statusConfig[value as keyof typeof statusConfig];
				return (
					<Tag color={config?.color || "default"}>
						{intl.formatMessage({ id: config?.text || value })}
					</Tag>
				);
			}
		},
		{
			title: intl.formatMessage({ id: "page.payments.table.actions" }),
			dataIndex: "actions",
			key: "actions",
			width: "100px",
			render: (_, payment) => (
				<Flex justify="center" align="center" gap={10}>
					<Popconfirm
						title={intl.formatMessage({ id: "general.delete.message" })}
						onConfirm={() => handleDelete(payment.id)}
						okText={intl.formatMessage({ id: "general.yes" })}
						cancelText={intl.formatMessage({ id: "general.no" })}
						placement="left"
					>
						<Button type="text" danger icon={<DeleteOutlined />} />
					</Popconfirm>
					<Button
						type="text"
						icon={<EditOutlined />}
						onClick={() => openEditModal(payment)}
					/>
				</Flex>
			)
		}
	];

	useEffect(() => {
		handleFetchPayments();
	}, [searchParams]);

	const orderByOptions = [
		{
			key: "newest",
			label: intl.formatMessage({
				id: "component.page-header-actions.sort.newest"
			})
		},
		{
			key: "oldest",
			label: intl.formatMessage({
				id: "component.page-header-actions.sort.oldest"
			})
		},
		{
			key: "amount_high",
			label: intl.formatMessage({ id: "page.payments.sort.amount-high" })
		},
		{
			key: "amount_low",
			label: intl.formatMessage({ id: "page.payments.sort.amount-low" })
		}
	];

	return (
		<>
			<Flex css={styles.container} vertical gap={10} flex={1}>
				<BoardPageHeader
					title={intl.formatMessage({ id: "page.payments.title" })}
					prefix={
						<PageHeaderFilters
							onReloadClick={handleFetchPayments}
							onSearchChange={handleSearchChange}
							onSelectChange={handleStatusChange}
							searchValue={searchParams.get("q") ?? ""}
							selectValue={searchParams.get("status") ?? ""}
							selectPlaceholder={intl.formatMessage({
								id: "page.payments.page-header-filters.status.placeholder"
							})}
							searchPlaceholder={intl.formatMessage({
								id: "page.payments.page-header-filters.search.placeholder"
							})}
							selectOptions={[
								{
									value: "paid",
									label: intl.formatMessage({ id: "page.payments.status.paid" })
								},
								{
									value: "pending",
									label: intl.formatMessage({
										id: "page.payments.status.pending"
									})
								},
								{
									value: "overdue",
									label: intl.formatMessage({
										id: "page.payments.status.overdue"
									})
								},
								{
									value: "cancelled",
									label: intl.formatMessage({
										id: "page.payments.status.cancelled"
									})
								}
							]}
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
					columns={paymentTableFields}
					dataSource={payments}
					rowKey="id"
					pagination={{ pageSize: PAGE_SIZE }}
					rowSelection={rowSelection}
					loading={loadingPayments}
					selectedRowKeys={selectedRowKeys}
				/>
			</Flex>
			{/* Payment Modal Forms would go here */}
		</>
	);
};

PaymentsPage.route = "/payments";

export default PaymentsPage;
