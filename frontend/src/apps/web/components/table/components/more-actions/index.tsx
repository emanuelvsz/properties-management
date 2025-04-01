import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";

interface Props {
	items: MenuProps["items"];
}

const TableMoreActions = ({ items }: Props) => (
	<Dropdown menu={{ items }} trigger={["click"]}>
		<Button type="default" icon={<EllipsisOutlined />} />
	</Dropdown>
);

export default TableMoreActions;
