import { InboxOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { Space, TableProps } from "antd";
import React from "react";
import { FormattedMessage } from "react-intl";

const styles = {
	emptyTableIcon: css`
		font-size: 4rem;
	`
};

export const getDefaultTableLocale = (): TableProps["locale"] => ({
	emptyText: (
		<Space direction="vertical">
			<InboxOutlined css={styles.emptyTableIcon} />
			<FormattedMessage id="component.empty.description" />
		</Space>
	)
});

export const clickOnRowIsValid = (event: React.MouseEvent) => {
	if ((event.target as HTMLElement).tagName.toLowerCase() === "td") {
		return true;
	}
	return false;
};
