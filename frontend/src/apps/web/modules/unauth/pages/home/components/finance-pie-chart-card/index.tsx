import { ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { Card } from "antd";
import { css } from "@emotion/react";

import { PIE_CHART_COLORS, pieChartData } from "./data";

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

const FinancePieChartCard = () => {
	return (
		<Card
			css={styles.chartCard}
			title="Rents by status"
			headStyle={{ borderBottom: "none" }}
		>
			<ResponsiveContainer width="100%" height={300}>
				<PieChart>
					<Pie
						data={pieChartData}
						dataKey="value"
						cx="50%"
						cy="50%"
						outerRadius={80}
						label
					>
						{pieChartData.map((_, index) => (
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
	);
};

export default FinancePieChartCard;
