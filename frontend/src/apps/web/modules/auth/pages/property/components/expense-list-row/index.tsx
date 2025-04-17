import { Button, Col, Flex, Popconfirm, Row } from "antd";
import BoardPageHeader from "../../../home/components/finance-bar-panel";
import { ColumnsType } from "antd/es/table";
import { Expense } from "@core/domain/models/expense";
import PageHeaderFilters from "@web/components/page-header-filters";
import PageHeaderActions from "@web/components/page-header-actions";
import { css } from "@emotion/react";
import { THEME_COLORS } from "@web/config/theme";
import Table from "@web/components/table";
import {
	useCreateExpense,
	useDeleteExpense
} from "@web/lib/contexts/expense/hooks";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useIntl } from "react-intl";
import AddExpenseModalForm from "@web/components/add-expense-modal-form";
import { useParams } from "react-router-dom";
import useCheckOrderByParam from "@web/lib/hooks/params/use-check-order-by-param";

interface Props {
	expenses: Expense[];
	loadingExpenses?: boolean;
	onReloadExpenses: () => void;
	onSelectChange: (value: string) => void;
	onSearchChange: (value: string) => void;
	searchValue: string;
	selectValue: string;
}

const PAGE_SIZE = 5;

const styles = {
	container: (itemsLengh: number) => css`
		${itemsLengh > 0 ? "padding-top: 1rem;" : "padding-block: 1rem;"}
		// background-color: ${THEME_COLORS.GRAY_LIGHT_COLOR};
		border-radius: 6px;
	`,
	tableItemExpanded: css`
		padding-inline: 28px;
	`
};

const ExpenseListRow = ({
	expenses,
	loadingExpenses,
	onReloadExpenses,
	onSelectChange,
	onSearchChange,
	searchValue,
	selectValue
}: Props) => {
	const [loading, setLoading] = useState(false);
	const [creatingExpense, setCreatingExpense] = useState(false);
	const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
	const deleteExpense = useDeleteExpense();
	const createExpense = useCreateExpense();
	const intl = useIntl();
	const { id: propertyId } = useParams<{ id: string }>();

	const checkOrderByParam = useCheckOrderByParam()

	const handleDelete = async (id: string) => {
		setLoading(true);
		await deleteExpense(id);
		setLoading(false);
		onReloadExpenses();
	};

	const handleOpenAddModal = () => {
		setIsAddModalVisible(true);
	};

	const handleCloseAddModal = () => {
		setIsAddModalVisible(false);
	};

	const handleAddProperty = async (values: any) => {
		const expense = Expense.fromForm({
			...values,
			property: propertyId
		});
		console.log("Expense: ", expense.toJSON());
		setCreatingExpense(true);
		await createExpense(expense);
		setCreatingExpense(false);
		handleCloseAddModal();
		onReloadExpenses();
	};

	const expenseTableFields: ColumnsType<Expense> = [
		{
			title: intl.formatMessage({
				id: "page.property.component.expense-list-row.table.item.name"
			}),
			dataIndex: "name",
			key: "name",
			render: (_, data: Expense) => <p>{data.name}</p>,
			width: 200
		},
		{
			title: intl.formatMessage({
				id: "page.property.component.expense-list-row.table.item.payed-at"
			}),
			dataIndex: "payed_at",
			key: "payed_at",
			render: (_, data: Expense) => {
				const date =
					typeof data.payedAt === "string" ? new Date(data.payedAt) : null;
				const isValid = date instanceof Date && !isNaN(date.getTime());

				console.log("Data: ", data, typeof data.payedAt, JSON.stringify(data));

				return isValid ? <p>{date.toLocaleDateString()}</p> : <p>—</p>;
			},
			width: 150
		},
		{
			title: intl.formatMessage({
				id: "page.property.component.expense-list-row.table.item.expense-value"
			}),
			dataIndex: "expense_value",
			key: "expense_value",
			render: (_, data: Expense) =>
				new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD"
				}).format(data.expenseValue),
			width: 150
		},
		{
			title: intl.formatMessage({
				id: "page.property.component.expense-list-row.table.item.updated-at"
			}),
			dataIndex: "updated_at",
			key: "updated_at",
			render: (_, data: Expense) => (
				<p>{new Date(data.updatedAt).toLocaleDateString()}</p>
			),
			width: 150
		},
		{
			title: intl.formatMessage({
				id: "page.property.component.expense-list-row.table.item.delete"
			}),
			dataIndex: "delete",
			key: "delete",
			render: (_, { id }) => (
				<Popconfirm
					title={intl.formatMessage({ id: "general.delete.message" })}
					onConfirm={() => handleDelete(id)}
					okText="Submit"
					cancelText="Cancel"
					placement="left"
				>
					<Button type="text" danger>
						<DeleteOutlined />
					</Button>
				</Popconfirm>
			),
			width: 100
		}
	];

	return (
		<Row gutter={24}>
			<Col span={24}>
				<Flex
					css={styles.container(expenses.length)}
					vertical
					gap={10}
					flex={1}
				>
					<BoardPageHeader
						title={intl.formatMessage({
							id: "page.property.component.expense-list-row.board-page-header.title"
						})}
						prefix={
							<PageHeaderFilters
								onReloadClick={onReloadExpenses}
								onSearchChange={onSearchChange}
								onSelectChange={onSelectChange}
								searchValue={searchValue}
								selectValue={selectValue}
								selectPlaceholder={intl.formatMessage({
									id: "page.property.component.expense-list-row.board-page-header.filters.select-placeholder"
								})}
								searchPlaceholder={intl.formatMessage({
									id: "page.property.component.expense-list-row.board-page-header.filters.search-placeholder"
								})}
								disabled={expenses.length === 0 && loadingExpenses === false && checkOrderByParam}
							/>
						}
						extra={
							<PageHeaderActions
								onAddClick={handleOpenAddModal}
								onOrderByChange={() => {}}
								disabled={expenses.length === 0 && loadingExpenses === false}
							/>
						}
					/>
					<Table
						columns={expenseTableFields}
						dataSource={expenses}
						rowKey="id"
						pagination={{ pageSize: PAGE_SIZE }}
						scroll={{ x: "max-content" }}
						loading={loading || loadingExpenses}
						size="small"
						expandable={{
							expandedRowRender: (record: Expense) => (
								<p css={styles.tableItemExpanded}>
									{record.description && record.description !== "null"
										? record.description
										: "—"}
								</p>
							),
							rowExpandable: (record: Expense) =>
								!!record.description && record.description !== "null"
						}}
						bordered
					/>
				</Flex>
			</Col>
			<AddExpenseModalForm
				visible={isAddModalVisible}
				loadingButton={creatingExpense}
				onCancel={handleCloseAddModal}
				onSubmit={handleAddProperty}
			/>
		</Row>
	);
};

export default ExpenseListRow;
