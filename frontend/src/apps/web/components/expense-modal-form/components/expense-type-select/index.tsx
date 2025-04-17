import { Select } from "antd";

const { Option } = Select;

interface Props {
	types: string[];
	value?: string;
	onChange?: (value: string) => void;
}

const ExpenseTypeSelect = ({ types, value, onChange }: Props) => {
	const getLabel = (type: string) => {
		switch (type) {
			case "fixed":
				return "Fixed";
			case "variable":
				return "Variable";
			case "unexpected":
				return "Unexpected";
			default:
				return type;
		}
	};

	return (
		<Select
			style={{ width: "100%" }}
			placeholder="Select expense type"
			value={value}
			onChange={onChange}
		>
			{types.map((type) => (
				<Option key={type} value={type}>
					{getLabel(type)}
				</Option>
			))}
		</Select>
	);
};

export default ExpenseTypeSelect;
