import { LeftOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";

import { Button, Flex, Layout, Row, Typography } from "antd";
import { PropsWithChildren, ReactNode } from "react";

interface Props {
	className?: string;
	showBackButton?: boolean;
	rightSideRender?: ReactNode;
	hideTitle?: boolean;
}

const styles = {
	container: css`
		padding: 1rem 1.5rem;
		overflow-y: auto;
	`,
	gobackButton: css`
		display: flex;
		align-items: center;
		justify-content: center;
	`,
	title: css`
		height: fit-content;
		margin-top: 0px;
		margin-bottom: 0rem !important;
	`
};

const handleGoBack = () => {
	globalThis.history.back();
};

const Page = ({
	children,
	className,
	showBackButton,
	rightSideRender,
	hideTitle
}: PropsWithChildren<Props>) => (
	<Layout.Content className={className} css={styles.container}>
		<Row justify="space-between">
			<Flex gap={8}>
				{showBackButton && (
					<Button
						css={styles.gobackButton}
						type="primary"
						icon={<LeftOutlined />}
						onClick={handleGoBack}
					/>
				)}
				{hideTitle ? null : (
					<Typography.Title id="page-title" level={3} css={styles.title} />
				)}
			</Flex>
			{rightSideRender}
		</Row>
		{children}
	</Layout.Content>
);

export default Page;
