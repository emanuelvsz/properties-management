import { css } from "@emotion/react";
import { Breadcrumb, Flex } from "antd";

import { ReactNode } from "react";

const styles = {
	container: css`
		white-space: nowrap;
	`,
	filterPanel: css`
		padding: 0 !important;
		margin: 0 !important;
		width: 100%;
		display: flex;
		align-items: center;
	`,
	filterText: css`
		margin: 0 !important;
		padding: 0 !important;
	`,
	separator: css`
		display: inline-flex;
		align-items: center;
		height: 100%;
		font-size: 20px;
	`
};

const breadcrumbLinkStyle = css`
	.ant-breadcrumb-link {
		&:hover {
			background: none !important;
		}
	}
`;

interface Props {
	title: string;
	prefix?: ReactNode;
	extra?: ReactNode;
	id?: string;
}

const BoardPageHeader = ({ title, prefix, extra, id }: Props) => {
	return (
		<>
			<Breadcrumb
				css={breadcrumbLinkStyle}
				separator={<span css={styles.separator}>/</span>}
				items={
					id
						? [
								{
									title: <h2 css={styles.filterText}>{title}</h2>,
									href: "/properties"
								},
								{
									title: <h2 css={styles.filterText}>{id}</h2>
								}
							]
						: [
								{
									title: <h2 css={styles.filterText}>{title}</h2>
								}
							]
				}
			/>

			<Flex css={styles.container} gap={15}>
				<Flex css={styles.filterPanel} justify="space-between">
					{prefix}
					{extra}
				</Flex>
			</Flex>
		</>
	);
};

export default BoardPageHeader;
