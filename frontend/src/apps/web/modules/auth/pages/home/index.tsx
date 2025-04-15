import { css } from "@emotion/react";
import { Button, DatePicker, DatePickerProps, Flex } from "antd";

import FinanceCard from "./components/finance-card";

import FinanceBarChartCard from "./components/finance-bar-chart-card";
import FinancePieChartCard from "./components/finance-pie-chart-card";
import BoardPageHeader from "./components/finance-bar-panel";
import { financeCardItems } from "./data";
import shareIcon from "@web/assets/icons/fi-rs-share.svg";
import downloadIcon from "@web/assets/icons/fi-rs-download.svg";
import { THEME_COLORS } from "@web/config/theme";

const styles = {
	container: css`
		padding-inline: 2rem;
		padding-block: 1rem;
		background-color: ${THEME_COLORS.GRAY_COLOR};
		min-height: calc(100vh - 4rem - 36px);
	`,
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

const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
	console.log(date, dateString);
};

const HomePage = () => {
	return (
		<Flex css={styles.container} vertical gap={10} flex={1}>
			<BoardPageHeader
				title="Dashboard"
				prefix={
					<Flex gap={15}>
						<DatePicker
							css={styles.filterInput}
							onChange={onDateChange}
							picker="month"
						/>
					</Flex>
				}
				extra={
					<Flex gap={10} justify="space-between">
						<Button
							css={styles.filterInput}
							icon={<img css={styles.fitlerIcon} src={downloadIcon} />}
						/>
						<Button
							css={styles.filterInput}
							icon={<img css={styles.fitlerIcon} src={shareIcon} />}
						/>
					</Flex>
				}
			/>
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
		</Flex>
	);
};

HomePage.route = "/";

export default HomePage;
