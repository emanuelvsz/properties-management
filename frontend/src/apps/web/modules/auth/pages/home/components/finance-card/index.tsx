import { Card, Flex } from "antd";
import { ReactNode } from "react";
import { css } from "@emotion/react";

import { FinanceValueColor } from "@core/domain/types/finance-card/finance-value-color";
import { THEME_COLORS } from "@web/config/theme";
import FinanceCardTitle from "../finance-card-title";

const styles = {
	card: css`
		width: 100%;
		min-height: 155px;
		border-radius: 6px;
		align-items: flex-end;
		justify-content: flex-end;
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
		margin: 0 !important;
		padding: 0 !important;
	`,
	cardTitle: css`
		font-size: 20px;
		font-weight: 600;
	`,
	priceContainer: css`
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		flex-grow: 1;
		height: 100%;
		padding: 0 !important;
		margin: 0 !important;
		line-height: 1;
	`,
	priceText: css`
		margin: 0 !important;
		padding: 0 !important;
		color: ${THEME_COLORS.PRIMARY_COLOR};
		font-size: 28px;
		font-weight: 600;
	`,
	priceTextCurrency: css`
		font-size: 20px;
		color: #000;
		font-weight: bold;
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
		bodyStyle={{
			padding: 22,
			display: "flex",
			flexDirection: "column",
			justifyContent: "flex-end"
		}}
		title={<FinanceCardTitle title={title} icon={icon} />}
		bordered
		loading={loading}
	>
		<Flex justify="space-between">
			<></>
			<Flex css={styles.priceContainer}>
				<p css={styles.priceText}>
					${value}
					<span css={styles.priceTextCurrency}> USD</span>
				</p>
				{value && (
					<p
						style={{
							color:
								extraColor === "green"
									? THEME_COLORS.LIGHT_GREEN_COLOR
									: THEME_COLORS.LIGHT_RED_COLOR
						}}
						css={styles.extraText}
					>
						{extraValue}%
					</p>
				)}
			</Flex>
		</Flex>
	</Card>
);

FinanceCard.route = "/home";

export type FinanceCardProps = Props;

export default FinanceCard;
