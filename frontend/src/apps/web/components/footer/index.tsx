import { THEME_COLORS } from "@web/config/theme";

import { css } from "@emotion/react";
import { Flex } from "antd";
import {
	GithubOutlined,
	InstagramOutlined,
	LinkedinOutlined
} from "@ant-design/icons";

const styles = {
	footer: css`
		min-height: 140px;
        padding-block: 2rem;
		background-color: ${THEME_COLORS.WHITE_COLOR};
	`,
	title: css`
		color: ${THEME_COLORS.PRIMARY_COLOR} !important;
		font-size: 18px;
		margin: 0;
		font-weight: 600;
	`,
	text: css`
		margin: 0;
		font-size: 16px;
		color: ${THEME_COLORS.PRIMARY_COLOR} !important;
	`,
	icon: css`
		color: ${THEME_COLORS.PRIMARY_COLOR} !important;
		font-size: 30px;
		cursor: pointer;
	`,
	creatorText: css`
		font-size: 14px;
	`
};

const Footer = () => {
	return (
		<Flex css={styles.footer} align="center" justify="center" vertical gap={10}>
			<Flex vertical align="center">
				<p css={styles.title}>Property Manager</p>
				<p css={styles.text}>2025 - All rights reserved</p>
			</Flex>
			<Flex gap={20}>
				<InstagramOutlined
					css={styles.icon}
					onClick={() =>
						window.open("https://www.instagram.com/emanuelvsz/", "_blank")
					}
				/>
				<LinkedinOutlined
					css={styles.icon}
					onClick={() =>
						window.open("https://www.linkedin.com/in/emanuelvsz/", "_blank")
					}
				/>
				<GithubOutlined
					css={styles.icon}
					onClick={() => window.open("https://github.com/emanuelvsz", "_blank")}
				/>
			</Flex>
			<p css={[styles.text, styles.creatorText]}>Created by Emanuel Vilela</p>
		</Flex>
	);
};

export default Footer;
