import { css } from "@emotion/react";

import { Flex, Typography } from "antd";

import { THEME_COLORS } from "@web/config/theme";

const styles = {
	titleContainer: css`
		max-width: 500px;
		width: 100%;
		margin-bottom: 2rem;
		@media (max-height: 800px) {
			margin-top: 4rem;
		}
	`,
	title: css`
		width: fit-content;
		margin-block: 0px !important;
		color: ${THEME_COLORS.PRIMARY_COLOR} !important;

		@media (max-width: 600px) {
			font-size: 2rem !important;
		}
	`
};

const UnauthHeader = () => (
	<Flex css={styles.titleContainer} vertical>
		<Typography.Title css={styles.title}>Property Manager</Typography.Title>
	</Flex>
);

export default UnauthHeader;
