import { css } from "@emotion/react";
import { Flex, Form, Switch } from "antd";

const styles = {
	container: css`
		justify-content: space-between;
		align-items: center;
	`
};

interface Props {
	onSelectCheckboxOption: (value: boolean) => void;
	initialValue: boolean;
	hideActions: boolean;
}

const TableHeader = ({
	onSelectCheckboxOption,
	initialValue,
	hideActions = false
}: Props) => {
	const handleOnChange = (value: boolean) => {
		onSelectCheckboxOption(value);
	};

	if (hideActions) {
		return null;
	}

	return (
		<Flex css={styles.container}>
			<Form layout="inline" initialValues={{ archived: initialValue }}>
				<Form.Item label="Archived">
					<Switch
						style={{ width: 50 }}
						onChange={(value) => {
							handleOnChange(value);
						}}
						value={initialValue}
					/>
				</Form.Item>
			</Form>
		</Flex>
	);
};

export default TableHeader;
