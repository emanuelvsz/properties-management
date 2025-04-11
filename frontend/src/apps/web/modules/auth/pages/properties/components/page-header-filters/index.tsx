import { css } from "@emotion/react";
import { Input, Button, Flex, Tooltip, Select } from "antd";
import {
	SearchOutlined,
	FilterOutlined,
	ReloadOutlined
} from "@ant-design/icons";
import { THEME_COLORS } from "@web/config/theme";

interface Props {
	onSearchChange?: (value: string) => void;
	onFurnishedChange?: (value: string) => void;
	onFilterClick?: () => void;
	onReloadClick?: () => void;
	searchValue?: string;
	furnishedValue?: string;
	placeholder?: string;
}

const inputHeight = 35;

const styles = {
	input: css`
		height: ${inputHeight}px;
		width: 250px;
	`,
	select: css`
		width: 160px;
		height: ${inputHeight}px;
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
	onFurnishedChange,
	onFilterClick,
	onReloadClick,
	searchValue,
	furnishedValue,
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
			<Select
				allowClear
				placeholder="Furnished"
				value={furnishedValue}
				onChange={onFurnishedChange}
				options={[
					{ label: "Yes", value: "true" },
					{ label: "No", value: "false" }
				]}
				css={styles.select}
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
