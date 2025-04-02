import { css } from "@emotion/react";
import { THEME_COLORS } from "@web/config/theme";
import { Divider, Flex } from "antd";
import { ReactNode } from "react";

import LayoutSider from "./components/layout-sider";
import userIcon from "@web/assets/icons/user.svg";
import bellIcon from "@web/assets/icons/fi-rs-bell.svg";

const HEADER_TEXT_FONT_SIZES = 18.5;
const HEADER_HEIGHT = 100;

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
	bodyHeader: css`
		width: 100%;
		height: ${HEADER_HEIGHT}px;
		padding-inline: 4rem;
		background-color: ${THEME_COLORS.WHITE_COLOR};
	`,
	headerUsername: css`
		color: ${THEME_COLORS.PRIMARY_COLOR};
		text-align: center;
		font-size: ${HEADER_TEXT_FONT_SIZES}px;
		font-weight: 500;
		text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
	`,
	headerIcon: css`
		height: ${HEADER_TEXT_FONT_SIZES}px;
		cursor: pointer;
	`,
	profileContainer: css`
		cursor: pointer;
	`,
	divider: css`
		height: ${HEADER_HEIGHT / 3}px;
		background-color: #acacac;
	`,
	content: css`
		padding-inline: 4rem;
		padding-block: 15px;
	`
};

interface Props {
	children?: ReactNode;
}

const BoardLayout = ({ children }: Props) => (
	<Flex css={styles.container}>
		<LayoutSider />
		<Flex css={styles.body} vertical>
			<Flex css={styles.bodyHeader} align="center" justify="right">
				<Flex align="center" gap={15}>
					<img css={styles.headerIcon} src={bellIcon} alt="Bell Icon" />
					<Divider css={styles.divider} type="vertical" />
					<Flex align="center" gap={15} css={styles.profileContainer}>
						<img css={styles.headerIcon} src={userIcon} alt="User Icon" />
						<p css={styles.headerUsername}>Emo</p>
					</Flex>
				</Flex>
			</Flex>
			<Flex css={styles.content} justify="center" vertical gap={15}>
				{children}
			</Flex>
		</Flex>
	</Flex>
);

BoardLayout.route = "/home";

export default BoardLayout;
