import { Flex } from "antd";

import BoardPageHeader from "../home/components/finance-bar-panel";
import { css } from "@emotion/react";
import { THEME_COLORS } from "@web/config/theme";
import { useParams } from "react-router-dom";

const styles = {
	container: css`
		padding-inline: 2rem;
		padding-block: 1rem;
		background-color: ${THEME_COLORS.GRAY_COLOR};
		min-height: calc(100vh - 4rem - 36px);
	`
};

const PropertyPage = () => {
	const { id } = useParams();

	return (
		<Flex css={styles.container} vertical gap={10} flex={1}>
			<BoardPageHeader title="Properties" id={id} />
		</Flex>
	);
};

PropertyPage.route = "/properties/:id?";

export default PropertyPage;
