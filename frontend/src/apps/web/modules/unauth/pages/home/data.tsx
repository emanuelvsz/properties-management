import { css } from "@emotion/react";

import { FinanceCardProps } from "./components/finance-card";
import dolarIcon from "@web/assets/icons/fi-rs-money.svg";
import arrowGrowIcon from "@web/assets/icons/fi-rs-chat-arrow-grow.svg";
import arrowDownIcon from "@web/assets/icons/fi-rs-chat-arrow-down.svg";

const styles = {
	cardIcon: css`
		height: 38px;
	`
};
export const financeCardItems: FinanceCardProps[] = [
	{
		title: "Gross Return",
		extraColor: "green",
		extraValue: 1.34,
		value: 12229.11,
		icon: <img css={styles.cardIcon} src={dolarIcon} alt="Dolar Icon" />
	},
	{
		title: "Expenses",
		extraColor: "green",
		extraValue: 2.15,
		value: 2829.12,
		icon: (
			<img css={styles.cardIcon} src={arrowDownIcon} alt="Arrow Down Icon" />
		)
	},
	{
		title: "Liquid Return",
		extraColor: "red",
		extraValue: 3.5,
		value: 2299.12,
		icon: (
			<img css={styles.cardIcon} src={arrowGrowIcon} alt="Arrow Grow Icon" />
		)
	}
];
