import { css } from "@emotion/react";
import { Flex } from "antd";

import { FinanceValueColor } from "@core/domain/types/finance-card/finance-value-color";
import { THEME_COLORS } from "@web/config/theme";

const styles = {
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
	`
};

interface Props {
	title: string;
	value: number;
	color: FinanceValueColor;
}

const FinanceCardTitle = ({ title, color, value }: Props) => (
	<Flex css={styles.titleWrapper}>
		<span css={styles.cardTitle}>{title}</span>
		{value && (
			<p
				style={{
					color:
						color === "green"
							? THEME_COLORS.LIGHT_GREEN_COLOR
							: THEME_COLORS.LIGHT_RED_COLOR
				}}
				css={styles.extraText}
			>
				{value}%
			</p>
		)}
	</Flex>
);

export default FinanceCardTitle;
