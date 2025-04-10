import { css } from "@emotion/react";
import { THEME_COLORS } from "@web/config/theme";
import { Flex } from "antd";
import { ReactNode } from "react";

import LayoutHeader from "./components/header";

const styles = {
	container: css`
		height: 100vh;
		width: 100%;

		@media (max-height: 800px) {
			justify-content: flex-start !important;
		}
	`,
	body: css`
		background-color: ${THEME_COLORS.GRAY_COLOR};
		width: 100%;
	`,
	content: css`
		padding-inline: 2.5rem;
		padding-block: 10px;
	`
};

interface Props {
	children?: ReactNode;
}

const BoardLayout = ({ children }: Props) => (
	<Flex css={styles.container}>
		<Flex css={styles.body} vertical>
			<LayoutHeader />
			<Flex css={styles.content} justify="center" vertical gap={10}>
				{children}
			</Flex>
		</Flex>
	</Flex>
);

export default BoardLayout;
