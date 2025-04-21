import { PlusOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { Button, Empty, Flex } from "antd";

interface Props {
	onSubmit: () => void;
	okText: string;
	descriptionText: string;
}

const styles = {
	extraEmpty: css`
		width: 100%;
	`,
	extraButton: css`
		border: none;
		box-shadow: none !important;
		width: fit-content;
	`
};

const EmptySection = ({ onSubmit, okText, descriptionText }: Props) => {
	return (
		<Flex justify="center" align="center" css={styles.extraEmpty} vertical>
			<Empty
				image={Empty.PRESENTED_IMAGE_SIMPLE}
				description={descriptionText}
			/>
			<Button
				type="primary"
				icon={<PlusOutlined />}
				onClick={onSubmit}
				css={styles.extraButton}
			>
				{okText}
			</Button>
		</Flex>
	);
};

export default EmptySection;
