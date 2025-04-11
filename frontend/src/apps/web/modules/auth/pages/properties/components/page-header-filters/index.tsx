import { css } from "@emotion/react";
import { Input, Button, Flex, Tooltip } from "antd";
import {
	SearchOutlined,
	FilterOutlined,
	ReloadOutlined
} from "@ant-design/icons";
import { THEME_COLORS } from "@web/config/theme";

interface Props {
	onSearchChange?: (value: string) => void;
	onFilterClick?: () => void;
	onReloadClick?: () => void;
	searchValue?: string;
	placeholder?: string;
}

const inputHeight = 35;

const styles = {
	input: css`
		height: ${inputHeight}px;
		width: 250px;
	`,
	button: css`
		width: ${inputHeight}px;
		height: ${inputHeight}px;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: none !important;
		border: none;

		&:hover,
		&:focus,
		&:active {
			box-shadow: none !important;
		}
	`
};

const PageHeaderFilters = ({
	onSearchChange,
	onFilterClick,
	onReloadClick,
	searchValue,
	placeholder = "Search properties..."
}: Props) => {
	return (
		<Flex gap={10} align="center">
			<Input
				allowClear
				prefix={<SearchOutlined color={THEME_COLORS.PRIMARY_COLOR} />}
				value={searchValue}
				onChange={(e) => onSearchChange?.(e.target.value)}
				placeholder={placeholder}
				css={styles.input}
			/>
			<Tooltip title="Filters">
				<Button
					icon={<FilterOutlined />}
					onClick={onFilterClick}
					css={styles.button}
				/>
			</Tooltip>
			<Tooltip title="Reload List">
				<Button
					icon={<ReloadOutlined />}
					onClick={onReloadClick}
					css={styles.button}
				/>
			</Tooltip>
		</Flex>
	);
};

export default PageHeaderFilters;
