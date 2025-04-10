/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Dropdown, Flex, MenuProps } from "antd";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { THEME_COLORS } from "@web/config/theme";

interface Props {
	onAddClick?: () => void;
	onSortChange?: (key: string) => void;
}

const dropdownHeight = 35;

const styles = {
	container: css`
		align-items: center;
		gap: 15px;
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

		&:hover,
		&:focus {
			background-color: ${THEME_COLORS.PRIMARY_COLOR};
			opacity: 0.9;
		}
	`
};

const sortOptions: MenuProps["items"] = [
	{ key: "newest", label: "Newest first" },
	{ key: "oldest", label: "Oldest first" },
	{ key: "price_high", label: "Price: High to Low" },
	{ key: "price_low", label: "Price: Low to High" },
	{ key: "bedrooms", label: "Most Bedrooms" }
];

const PageHeaderActions = ({ onAddClick, onSortChange }: Props) => {
	return (
		<Flex css={styles.container}>
			<Dropdown
				menu={{ items: sortOptions, onClick: ({ key }) => onSortChange?.(key) }}
				trigger={["click"]}
			>
				<Button css={styles.dropdownButton}>
					Sort <DownOutlined />
				</Button>
			</Dropdown>

			<Button
				type="primary"
				icon={<PlusOutlined />}
				onClick={onAddClick}
				css={styles.addButton}
			/>
		</Flex>
	);
};

export default PageHeaderActions;
