/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Dropdown, Flex, MenuProps, Tooltip } from "antd";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { THEME_COLORS } from "@web/config/theme";

interface Props {
	onAddClick?: () => void;
	onSortChange?: (key: string) => void;
}

const dropdownHeight = 35;

const styles = {
	container: css`
		align-items: center;
	`,
	dropdownButton: css`
		height: ${dropdownHeight}px;
	`,
	addButton: css`
		width: ${dropdownHeight}px;
		height: ${dropdownHeight}px;
		background-color: ${THEME_COLORS.PRIMARY_COLOR};
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		box-shadow: none !important;

		&:hover,
		&:focus {
			background-color: ${THEME_COLORS.PRIMARY_COLOR};
			opacity: 0.9;
		}
	`
};

const sortOptions = [
	{ key: "newest", label: "Newest first" },
	{ key: "oldest", label: "Oldest first" },
	{ key: "price_high", label: "Price: High to Low" },
	{ key: "price_low", label: "Price: Low to High" },
	{ key: "bedrooms", label: "Most Bedrooms" }
] as const;

const keyToLabelMap = Object.fromEntries(
	sortOptions.map((item) => [item.key, item.label])
);

const PageHeaderActions = ({ onAddClick, onSortChange }: Props) => {
	const [selectedKey, setSelectedKey] = useState("newest");

	const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
		setSelectedKey(key);
		onSortChange?.(key);
	};

	return (
		<Flex css={styles.container} gap={10}>
			<Dropdown
				menu={{
					items: sortOptions as unknown as MenuProps["items"],
					onClick: handleMenuClick
				}}
				trigger={["click"]}
			>
				<Button css={styles.dropdownButton}>
					{keyToLabelMap[selectedKey]} <DownOutlined />
				</Button>
			</Dropdown>
			<Tooltip title="Add Item">
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={onAddClick}
					css={styles.addButton}
				/>
			</Tooltip>
		</Flex>
	);
};

export default PageHeaderActions;
