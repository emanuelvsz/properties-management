import { css } from "@emotion/react";
import { Flex } from "antd";

import FinanceCard from "./components/finance-card";

import BoardLayout from "@web/components/layout";
import FinanceBarChartCard from "./components/finance-bar-chart-card";
import FinancePieChartCard from "./components/finance-pie-chart-card";
import FinanceBarPanel from "./components/finance-bar-panel";
import { financeCardItems } from "./data";

const styles = {
	cardList: css`
		width: 100%;
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

const HomePage = () => {
	return (
		<BoardLayout>
			<FinanceBarPanel title="Control Panel" />
			<Flex gap={15} css={styles.cardList}>
				{financeCardItems.map((item, index) => (
					<FinanceCard
						key={index}
						title={item.title}
						extraColor={item.extraColor}
						extraValue={item.extraValue}
						value={item.value}
						icon={item.icon}
					/>
				))}
			</Flex>
			<Flex gap={15} css={styles.cardList}>
				<FinanceBarChartCard />
				<FinancePieChartCard />
			</Flex>
		</BoardLayout>
	);
};

HomePage.route = "/home";

export default HomePage;
