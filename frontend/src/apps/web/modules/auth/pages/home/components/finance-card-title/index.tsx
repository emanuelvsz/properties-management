import { css } from "@emotion/react";
import { Flex } from "antd";

import { ReactNode } from "react";

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
		font-weight: bold;
	`
};

interface Props {
	title: string;
	icon: ReactNode;
}

const FinanceCardTitle = ({ title, icon }: Props) => (
	<Flex css={styles.titleWrapper}>
		<span css={styles.cardTitle}>{title}</span>
		{icon}
	</Flex>
);

export default FinanceCardTitle;
