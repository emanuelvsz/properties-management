import { Card, Flex, Skeleton } from "antd";
import { useIntl } from "react-intl";
import { ReactNode } from "react";
import { css } from "@emotion/react";

import { FinanceValueColor } from "@core/domain/types/finance-card/finance-value-color";
import { THEME_COLORS } from "@web/config/theme";

const styles = {
	card: css`
		width: 100%;
		height: 140px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.ant-card-body {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 23px !important;
		}
	`,
	titleWrapper: css`
		display: flex !important;
		justify-content: space-between !important;
		align-items: center;
		width: 100%;
		margin-bottom: 10px;
		font-size: 18px;
	`,
	cardTitle: css`
		color: #333;
		padding: 0 !important;
		margin: 0 !important;
	`,
	valueWrapper: css`
		display: flex !important;
		justify-content: space-between !important;
		align-items: center;
		width: 100%;
		line-height: 1;
	`,
	valueText: css`
		font-size: 22px;
		font-weight: bold;
		color: ${THEME_COLORS.PRIMARY_COLOR};
		line-height: 1;
		padding: 0 !important;
		margin: 0 !important;
	`,
	currency: css`
		font-size: 16px;
		font-weight: 500;
		color: #000;
		margin-left: 4px;
	`,
	percentageChange: css`
		font-size: 14px;
		font-weight: bold;
		line-height: 1;
		padding: 0 !important;
		margin: 0 !important;
	`,
	paddinglessCard: css`
		.ant-card-body {
			flex: 1;
			padding-block: 10px !important;
		}
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
}: Props) => {
	const intl = useIntl();
	let translatedTitle = title;
	if (title === "Gross Return")
		translatedTitle = intl.formatMessage({ id: "dashboard.card.gross-return" });
	if (title === "Expenses")
		translatedTitle = intl.formatMessage({ id: "dashboard.card.expenses" });
	if (title === "Liquid Return")
		translatedTitle = intl.formatMessage({
			id: "dashboard.card.liquid-return"
		});
	return (
		<Card css={[styles.card, loading && styles.paddinglessCard]} bordered>
			{loading ? (
				<Skeleton active title={false} paragraph={{ rows: 3 }} />
			) : (
				<>
					<Flex css={styles.titleWrapper}>
						<h3 css={styles.cardTitle}>{translatedTitle}</h3>
						{icon}
					</Flex>
					<Flex css={styles.valueWrapper}>
						<p css={styles.valueText}>
							{new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: "USD"
							}).format(value)}
							<span css={styles.currency}>USD</span>
						</p>
						<p
							css={styles.percentageChange}
							style={{
								color:
									extraColor === "green"
										? THEME_COLORS.LIGHT_GREEN_COLOR
										: THEME_COLORS.LIGHT_RED_COLOR
							}}
						>
							{extraValue > 0 ? "↑" : extraValue === 0 ? "-" : "↓"}{" "}
							{Math.abs(extraValue)}%
						</p>
					</Flex>
				</>
			)}
		</Card>
	);
};

export type FinanceCardProps = Props;

export default FinanceCard;
