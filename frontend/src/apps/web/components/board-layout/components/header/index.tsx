import { Divider, Flex } from "antd";
import { css } from "@emotion/react";

import { THEME_COLORS } from "@web/config/theme";

import userPrimaryIcon from "@web/assets/icons/user.svg";
import bellIcon from "@web/assets/icons/fi-rs-bell.svg";
import { useAccount, useLogout } from "@web/lib/contexts/auth/hooks";
import { useEffect } from "react";

const HEADER_TEXT_FONT_SIZES = 17;
const HEADER_HEIGHT = 100;

const styles = {
	header: css`
		width: 100%;
		min-height: ${HEADER_HEIGHT}px !important;
		height: ${HEADER_HEIGHT}px !important;
		padding-inline: 2.5rem;
		background-color: ${THEME_COLORS.WHITE_COLOR};
		position: sticky;
		top: 0;
	`,
	headerUsername: css`
		color: ${THEME_COLORS.PRIMARY_COLOR};
		text-align: center;
		font-size: ${HEADER_TEXT_FONT_SIZES}px;
		font-weight: 500;
	`,
	headerIcon: css`
		height: ${HEADER_TEXT_FONT_SIZES}px !important;
		cursor: pointer;
	`,
	profileContainer: css`
		cursor: pointer;
	`,
	divider: css`
		height: ${HEADER_HEIGHT / 3}px;
		background-color: #acacac;
	`
};

const LayoutHeader = () => {
	const account = useAccount();
	const logout = useLogout();

	useEffect(() => {
		console.log(account);
	}, [account]);

	return (
		<Flex css={styles.header} align="center" justify="right">
			<Flex align="center" gap={15}>
				<img src={bellIcon} css={styles.headerIcon} />
				<Divider css={styles.divider} type="vertical" />
				<Flex
					align="center"
					gap={15}
					css={styles.profileContainer}
					onClick={() => logout()}
				>
					<img src={userPrimaryIcon} css={styles.headerIcon} />
					<p css={styles.headerUsername}>{account?.email}</p>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default LayoutHeader;
