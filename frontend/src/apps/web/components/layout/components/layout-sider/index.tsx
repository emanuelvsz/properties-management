import { css } from "@emotion/react";
import Sider from "antd/es/layout/Sider";
import { THEME_COLORS } from "@web/config/theme";
import { Flex } from "antd";

import logoWhite from "@web/assets/images/logo-white.png";

const styles = {
	sider: css`
		background-color: ${THEME_COLORS.PRIMARY_COLOR} !important;
		height: 100vh;
		max-width: 300px;
		display: flex;
		flex-direction: column;
		gap: auto;

		@media (max-width: 1000px) {
			display: none;
		}
	`,
	siderHeader: css`
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	`,
	siderHeaderLogo: css`
		height: 55px;
	`
};

const LayoutSider = () => (
	<Sider css={styles.sider} collapsed={false} collapsedWidth={90} width={280}>
		<Flex css={styles.siderHeader}>
			<img src={logoWhite} css={styles.siderHeaderLogo} />
		</Flex>
	</Sider>
);

LayoutSider.route = "/home";

export default LayoutSider;
