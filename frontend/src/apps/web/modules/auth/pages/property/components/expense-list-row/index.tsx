import { Button, Col, Flex, Popconfirm, Row } from "antd";
import BoardPageHeader from "../../../home/components/finance-bar-panel";
import { ColumnsType } from "antd/es/table";
import { Expense } from "@core/domain/models/expense";
import PageHeaderFilters from "@web/components/page-header-filters";
import PageHeaderActions from "@web/components/page-header-actions";
import { css } from "@emotion/react";
import { THEME_COLORS } from "@web/config/theme";
import Table from "@web/components/table";
import { useDeleteExpense } from "@web/lib/contexts/expense/hooks";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";

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
		padding-inline: 2rem;
		${itemsLengh > 0 ? "padding-top: 1rem;" : "padding-block: 1rem;"}
		background-color: ${THEME_COLORS.GRAY_LIGHT_COLOR};
		border-radius: 6px;
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
	const deleteExpense = useDeleteExpense();

	const handleDelete = async (id: string) => {
		setLoading(true);
		await deleteExpense(id);
		setLoading(false);
		onReloadExpenses();
	};

	const expenseTableFields: ColumnsType<Expense> = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (_, data: Expense) => <p>{data.name}</p>,
			width: 200
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			render: (_, data: Expense) => <p>{data.description}</p>,
			width: 300
		},

		{
			title: "Payed At",
			dataIndex: "payed_at",
			key: "payed_at",
			render: (_, data: Expense) =>
				data.payedAt ? (
					<p>{new Date(data.payedAt).toLocaleDateString()}</p>
				) : (
					<p>—</p>
				),
			width: 150
		},
		{
			title: "Expense Value",
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
			title: "Updated At",
			dataIndex: "updated_at",
			key: "updated_at",
			render: (_, data: Expense) => (
				<p>{new Date(data.updatedAt).toLocaleDateString()}</p>
			),
			width: 150
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
						title="Property Expenses"
						prefix={
							<PageHeaderFilters
								onReloadClick={onReloadExpenses}
								onSearchChange={onSearchChange}
								onSelectChange={onSelectChange}
								searchValue={searchValue}
								selectValue={selectValue}
								selectPlaceholder="Payed"
								searchPlaceholder="Search expenses"
							/>
						}
						extra={
							<PageHeaderActions
								onAddClick={() => {}}
								onOrderByChange={() => {}}
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
					/>
				</Flex>
			</Col>
		</Row>
	);
};

export default ExpenseListRow;
