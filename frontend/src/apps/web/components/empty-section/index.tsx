import { PlusOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { Button, Empty, Flex } from "antd";
import { FormattedMessage } from "react-intl";

interface Props {
	onSubmit: () => void;
	entity: string;
}

const styles = {
	container: css`
		text-align: center;
		padding: 31.2px 15.6px;
	`,
	illustration: css`
		width: 97.5px;
		margin: 0 auto 15.6px;
	`,
	title: css`
		margin: 0;
		font-size: 1.5rem;
		font-weight: 500;
		color: #333;
	`,
	description: css`
		margin: 10.4px 0;
		color: #666;
		font-size: 1rem;
	`,
	button: css`
		margin-top: 15.6px;
		box-shadow: none !important;
		border: none;
		width: fit-content;
	`
};

const EmptySection = ({ onSubmit, entity }: Props) => {
	if (!entity) {
		return null;
	}

	entity = entity.toLowerCase();

	return (
		<Flex justify="center" align="center" css={styles.container} vertical>
			<Empty css={styles.illustration} image={Empty.PRESENTED_IMAGE_SIMPLE} />
			<FormattedMessage
				tagName="h3"
				css={styles.title}
				id="component.empty-section.title"
				values={{ value: entity }}
			/>
			<FormattedMessage
				tagName="p"
				css={styles.description}
				id="component.empty-section.description"
				values={{ value: entity }}
			/>

			<Button
				type="primary"
				icon={<PlusOutlined />}
				onClick={onSubmit}
				css={styles.button}
			>
				<FormattedMessage
					id="component.empty-section.button-text"
					values={{ value: entity }}
				/>
			</Button>
		</Flex>
	);
};

export default EmptySection;
