import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { css } from "@emotion/react";
import { Button, Card, Col, Flex, Popconfirm, Row } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { ColumnsType } from "antd/es/table";
import { Expense } from "@core/domain/models/expense";

import Table from "@web/components/table";
import ExpenseModalForm from "@web/components/expense-modal-form";
import PageHeaderFilters from "@web/components/page-header-filters";
import PageHeaderActions from "@web/components/page-header-actions";
import BoardPageHeader from "../../../home/components/finance-bar-panel";

import {
	useCreateExpense,
	useDeleteExpense,
	useListExpenseTypes,
	useUpdateExpense
} from "@web/lib/contexts/expense/hooks";
import useCheckOrderByParam from "@web/lib/hooks/params/use-check-order-by-param";
import EmptySection from "@web/components/empty-section";
import { Pagination } from "@core/domain/models/pagination";

interface Props {
	pagination: Pagination<Expense>;
	loading?: boolean;
	onReload?: (page: number) => void;
	onSelectChange?: (value: string) => void;
	onSearchChange?: (value: string) => void;
	onOrderByChange?: (value: string) => void;
	searchValue?: string;
	selectValue?: string;
	hideActions: boolean;
	title: string;
}

const styles = {
	container: css`
		border-radius: 6px;
	`,
	tableItemExpanded: css`
		padding-inline: 28px;
	`
};

const ExpenseListRow = ({
	pagination,
	loading: loadingExpenses,
	onReload,
	onSelectChange,
	onSearchChange,
	onOrderByChange,
	searchValue,
	selectValue,
	hideActions,
	title
}: Props) => {
	const intl = useIntl();
	const { id: propertyId } = useParams<{ id: string }>();
	const checkOrderByParam = useCheckOrderByParam();

	const deleteExpense = useDeleteExpense();
	const createExpense = useCreateExpense();
	const updateExpense = useUpdateExpense();
	const listExpenseTypes = useListExpenseTypes();

	const [isAddModalVisible, setIsAddModalVisible] = useState(false);
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [editingExpense, setEditingExpense] = useState<Expense | undefined>(
		undefined
	);

	const [loading, setLoading] = useState({
		create: false,
		update: false,
		delete: false,
		types: false
	});

	const [expenseTypes, setExpenseTypes] = useState<string[]>([]);

	const handleDelete = async (id: string) => {
		setLoading((prev) => ({ ...prev, delete: true }));
		await deleteExpense(id);
		setLoading((prev) => ({ ...prev, delete: false }));
		if (onReload) {
			onReload(1);
		}
	};

	const handleAddExpense = async (values: any) => {
		const expense = Expense.fromForm({ ...values, property: propertyId });
		setLoading((prev) => ({ ...prev, create: true }));
		await createExpense(expense);
		setLoading((prev) => ({ ...prev, create: false }));
		setIsAddModalVisible(false);
		if (onReload) {
			onReload(1);
		}
	};

	const handleUpdateExpense = async (values: any) => {
		if (!editingExpense) return;
		const expense = Expense.fromForm(values);
		setLoading((prev) => ({ ...prev, update: true }));
		await updateExpense(expense, editingExpense.id);
		if (onReload) {
			onReload(1);
		}
		setLoading((prev) => ({ ...prev, update: false }));
		setIsEditModalVisible(false);
		setEditingExpense(undefined);
	};

	const openEditModal = (expense: Expense) => {
		setEditingExpense(expense);
		setIsEditModalVisible(true);
	};

	const expenseColumns: ColumnsType<Expense> = [
		{
			title: intl.formatMessage({
				id: "page.property.component.expense-list-row.table.item.name"
			}),
			dataIndex: "name",
			key: "name",
			width: 200,
			render: (_, expense) => <p>{expense.name}</p>
		},
		{
			title: intl.formatMessage({
				id: "page.property.component.expense-list-row.table.item.payed-at"
			}),
			dataIndex: "payed_at",
			key: "payed_at",
			width: 150,
			render: (_, data: Expense) => {
				if (!data.payedAt) return <p>—</p>;
				const date = new Date(data.payedAt);
				return isNaN(date.getTime()) ? (
					<p>—</p>
				) : (
					<p>{date.toLocaleDateString()}</p>
				);
			}
		},
		{
			title: intl.formatMessage({
				id: "page.property.component.expense-list-row.table.item.expense-value"
			}),
			dataIndex: "expense_value",
			key: "expense_value",
			width: 150,
			render: (_, expense) =>
				new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD"
				}).format(expense.expenseValue)
		},
		{
			title: "Due Date",
			dataIndex: "due_date",
			key: "due_date",
			width: 150,
			render: (_, expense) => (
				<p>{new Date(expense.dueDate).toLocaleDateString()}</p>
			)
		},
		{
			title: "",
			dataIndex: "actions",
			key: "actions",
			width: 100,
			render: (_, expense) => (
				<Flex justify="center" align="center" gap={10}>
					<Popconfirm
						title={intl.formatMessage({ id: "general.delete.message" })}
						onConfirm={() => handleDelete(expense.id)}
						okText="Submit"
						cancelText="Cancel"
						placement="left"
					>
						<Button type="text" danger icon={<DeleteOutlined />} />
					</Popconfirm>
					<Button
						type="text"
						icon={<EditOutlined />}
						onClick={() => openEditModal(expense)}
					/>
				</Flex>
			)
		}
	];

	useEffect(() => {
		const fetchExpenseTypes = async () => {
			setLoading((prev) => ({ ...prev, types: true }));
			const types = await listExpenseTypes();
			setExpenseTypes(types);
			setLoading((prev) => ({ ...prev, types: false }));
		};

		fetchExpenseTypes();
	}, [listExpenseTypes]);

	const orderByOptions = [
		{ key: "newest", label: "Mais recentes" },
		{ key: "oldest", label: "Mais antigos" },
		{ key: "highest_value", label: "Maior valor" },
		{ key: "lowest_value", label: "Menor valor" },
		{ key: "due_soon", label: "Vencimento mais próximo" },
		{ key: "due_late", label: "Vencimento mais distante" }
	];

	return (
		<Card loading={loadingExpenses}>
			<Row gutter={24}>
				<Col span={24}>
					<Flex css={styles.container} vertical gap={10}>
						<BoardPageHeader
							title={title}
							prefix={
								<PageHeaderFilters
									onReloadClick={() => onReload && onReload(1)}
									onSearchChange={onSearchChange}
									onSelectChange={onSelectChange}
									searchValue={searchValue}
									selectValue={selectValue}
									searchPlaceholder={intl.formatMessage({
										id: "page.property.component.expense-list-row.board-page-header.filters.search-placeholder"
									})}
									selectPlaceholder={intl.formatMessage({
										id: "page.property.component.expense-list-row.board-page-header.filters.select-placeholder"
									})}
									disabled={
										pagination.total === 0 &&
										!loadingExpenses &&
										checkOrderByParam
									}
									hideActions={hideActions || pagination.total === 0}
								/>
							}
							extra={
								pagination.total >= 1 ? (
									<PageHeaderActions
										onAddClick={() => setIsAddModalVisible(true)}
										onOrderByChange={onOrderByChange}
										disabled={pagination.items.length === 0 && !loadingExpenses}
										disableActions={hideActions}
										orderByOptions={orderByOptions}
									/>
								) : (
									<EmptySection
										onSubmit={() => setIsAddModalVisible(true)}
										okText="Cadastrar uma despesa"
										descriptionText="Ainda não há despesas cadastradas"
									/>
								)
							}
						/>
						{pagination.total >= 1 ? (
							<Table
								columns={expenseColumns}
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
								loading={
									loading.create ||
									loading.update ||
									loading.delete ||
									loadingExpenses
								}
								size="small"
								expandable={{
									expandedRowRender: (record) => (
										<p css={styles.tableItemExpanded}>
											{record.description && record.description !== "null"
												? record.description
												: "—"}
										</p>
									),
									rowExpandable: (record) =>
										!!record.description && record.description !== "null"
								}}
								bordered
							/>
						) : null}
					</Flex>
				</Col>
			</Row>

			<ExpenseModalForm
				visible={isAddModalVisible}
				loadingButton={loading.create}
				onCancel={() => setIsAddModalVisible(false)}
				onSubmit={handleAddExpense}
				title="Add Property Expense"
				types={expenseTypes}
				loading={loading.types}
				formName="add_expense_form"
			/>

			<ExpenseModalForm
				visible={isEditModalVisible}
				loadingButton={loading.update}
				onCancel={() => setIsEditModalVisible(false)}
				onSubmit={handleUpdateExpense}
				title="Update Property Expense"
				expense={editingExpense}
				types={expenseTypes}
				loading={loading.types}
				formName="edit_expense_form"
			/>
		</Card>
	);
};

export default ExpenseListRow;
