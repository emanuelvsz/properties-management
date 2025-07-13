import { Form, Switch } from "antd";
import { useIntl } from "react-intl";
import { useState } from "react";

interface Props {
	onSelectCheckboxOption: (value: boolean) => void;
	initialValue: boolean;
	hideActions: boolean;
}

const TableHeader = ({
	onSelectCheckboxOption,
	initialValue,
	hideActions
}: Props) => {
	const intl = useIntl();
	const [archivedSwitchValue, setArchivedSwitchValue] =
		useState<boolean>(initialValue);

	const handleSwitchChange = (checked: boolean) => {
		setArchivedSwitchValue(checked);
		onSelectCheckboxOption(checked);
	};

	if (hideActions) {
		return null;
	}

	return (
		<Form layout="inline" initialValues={{ archived: initialValue }}>
			<Form.Item
				label={intl.formatMessage({
					id: "page.property.contracts.table-header.archived"
				})}
			>
				<Switch
					checked={archivedSwitchValue}
					onChange={handleSwitchChange}
					disabled={hideActions}
				/>
			</Form.Item>
		</Form>
	);
};

export default TableHeader;
