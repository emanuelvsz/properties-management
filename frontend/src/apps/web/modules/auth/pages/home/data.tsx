import { css } from "@emotion/react";

import { FinanceCardProps } from "./components/finance-card";
import arrowDownIcon from "@web/assets/icons/fi-rs-chat-arrow-down.svg";
import arrowUpIcon from "@web/assets/icons/fi-rs-chat-arrow-grow.svg";
import moneyIcon from "@web/assets/icons/fi-rs-money.svg";
import { THEME_COLORS } from "@web/config/theme";

const styles = {
	cardIcon: css`
		height: 38px;
		color: ${THEME_COLORS.PRIMARY_COLOR} !important;
	`
};
export const financeCardItems: FinanceCardProps[] = [
	{
		title: "Gross Return",
		extraColor: "green",
		extraValue: 1.34,
		value: 12229.11,
		icon: <img src={moneyIcon} css={styles.cardIcon} />
	},
	{
		title: "Expenses",
		extraColor: "green",
		extraValue: 2.15,
		value: 2829.12,
		icon: <img src={arrowDownIcon} css={styles.cardIcon} />
	},
	{
		title: "Liquid Return",
		extraColor: "red",
		extraValue: 3.5,
		value: 2299.12,
		icon: <img src={arrowUpIcon} css={styles.cardIcon} />
	}
];
