import { Card, Col, Row } from "antd";
import { Expense } from "@core/domain/models/expense";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { PIE_CHART_COLORS } from "../../../home/components/finance-pie-chart-card/data";
import { useIntl } from "react-intl";

interface Props {
	expenses: Expense[];
}

const ChartListRow = ({ expenses }: Props) => {
	const intl = useIntl();

	return (
		<Row gutter={24}>
			<Col span={8}>
				{expenses.length >= 1 && (
					<Card
						title={intl.formatMessage({
							id: "page.property.component.chart.list.row.card.first.title"
						})}
					>
						<ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
									data={expenses.map((item) => ({
										type: item.name,
										value: item.expenseValue
									}))}
									dataKey="value"
									nameKey="type"
									cx="50%"
									cy="50%"
									outerRadius={80}
									label={({ value }) =>
										new Intl.NumberFormat("en-US", {
											style: "currency",
											currency: "USD"
										}).format(value)
									}
								>
									{expenses.map((_, index) => (
										<Cell
											key={`cell-${index}`}
											fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
										/>
									))}
								</Pie>
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</Card>
				)}
			</Col>
		</Row>
	);
};

export default ChartListRow;
