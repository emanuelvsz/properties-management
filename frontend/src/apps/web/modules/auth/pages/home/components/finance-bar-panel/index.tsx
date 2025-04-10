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
	filterInput: css`
		height: 35px;
	`,
	fitlerIcon: css`
		height: 17px;
	`
};

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
				separator={
					<span
						style={{
							display: "inline-flex",
							alignItems: "center",
							height: "100%",
							fontSize: "20px"
						}}
					>
						/
					</span>
				}
				items={
					id
						? [
								{ title: <h2 css={styles.filterText}>{title}</h2> },
								{ title: id }
							]
						: [{ title: <h2 css={styles.filterText}>{title}</h2> }]
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
