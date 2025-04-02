import { css } from "@emotion/react";

import { Card } from "antd";
import {
	BarChart,
	Bar,
	ResponsiveContainer,
	Rectangle,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend
} from "recharts";
import { barChartData } from "./data";

const styles = {
	cardList: css`
		width: 100%;
	`,
	cardIcon: css`
		height: 38px;
	`,
	filterContainer: css`
		padding: 0 !important;
		margin: 0 !important;
		width: 100%;
		display: flex;
		align-items: center;
	`,
	filterText: css`
		margin: 0 !important;
		padding: 0 !important;
	`,
	filterInput: css`
		height: 35px;
	`,
	fitlerIcon: css`
		height: 17px;
	`,
	chartCard: css`
		width: 100%;
	`
};

const FinanceBarChartCard = () => {
	return (
		<Card
			css={styles.chartCard}
			title="Return by months"
			headStyle={{ borderBottom: "none" }}
		>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart
					data={barChartData}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar
						dataKey="return"
						fill="#7c9d91"
						activeBar={<Rectangle fill="#7c9d91" stroke="blue" />}
					/>
					<Bar
						dataKey="expense"
						fill="#a2838e"
						activeBar={<Rectangle fill="#a2838e" stroke="purple" />}
					/>
				</BarChart>
			</ResponsiveContainer>
		</Card>
	);
};

export default FinanceBarChartCard;
