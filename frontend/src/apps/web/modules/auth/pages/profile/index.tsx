import { Flex } from "antd";
import { css } from "@emotion/react";

import { useAccount } from "@web/lib/contexts/auth/hooks";
import { THEME_COLORS } from "@web/config/theme";
import HeaderCard from "./components/header-card";
import DetailsCard from "./components/details-card";

const styles = {
	container: css`
		background-color: ${THEME_COLORS.GRAY_COLOR};
		min-height: calc(100vh - 4rem - 36px);
		padding-inline: 2rem;
		padding-block: 1rem;
	`
};

const ProfilePage = () => {
	const account = useAccount();

	if (!account) {
		return null;
	}

	return (
		<Flex css={styles.container} vertical gap={10}>
			<HeaderCard account={account} />
			<DetailsCard account={account} />
		</Flex>
	);
};

ProfilePage.route = "/profile";

export default ProfilePage;
