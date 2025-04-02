import { Card, Flex } from "antd";
import { ReactNode } from "react";
import { css } from "@emotion/react";

import { FinanceValueColor } from "@core/domain/types/finance-card/finance-value-color";
import { THEME_COLORS } from "@web/config/theme";
import FinanceCardTitle from "../finance-card-title";

const styles = {
	card: css`
		width: 100%;
		border-radius: 6px;
	`,
	titleWrapper: css`
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	`,
	extraText: css`
		font-size: 17px;
		font-weight: bold;
	`,
	cardTitle: css`
		font-size: 20px;
		font-weight: 600;
	`,
	priceContainer: css`
		padding: 0 !important;
		margin: 0 !important;
		width: 100%;
		display: flex;
	`,
	priceText: css`
		margin: 0 !important;
		padding: 0 !important;
		color: ${THEME_COLORS.PRIMARY_COLOR};
		font-size: 28px;
		font-weight: bold;
		align-items: center;
		justify-content: center;
	`,
	priceTextCurrency: css`
		font-size: 18px;
		color: #000;
		font-weight: 700;
	`
};

interface Props {
	title: string;
	extraValue: number;
	extraColor: FinanceValueColor;
	value: number;
	icon: ReactNode;
	loading?: boolean;
}

const FinanceCard = ({
	title,
	extraValue,
	extraColor,
	value,
	icon,
	loading = false
}: Props) => (
	<Card
		css={styles.card}
		headStyle={{ borderBottom: "none" }}
		title={
			<FinanceCardTitle title={title} color={extraColor} value={extraValue} />
		}
		bordered
		loading={loading}
	>
		<Flex css={styles.priceContainer} align="center" justify="space-between">
			<p css={styles.priceText}>
				${value}
				<span css={styles.priceTextCurrency}> USD</span>
			</p>
			{icon}
		</Flex>
	</Card>
);

FinanceCard.route = "/home";

export type FinanceCardProps = Props;

export default FinanceCard;
