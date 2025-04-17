import { css } from "@emotion/react";
import { Input, Button, Flex, Tooltip, Select } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl"; // Importando o hook useIntl
import { THEME_COLORS } from "@web/config/theme";

interface Props {
	onSearchChange?: (value: string) => void;
	onSelectChange?: (value: string) => void;
	onFilterClick?: () => void;
	onReloadClick?: () => void;
	searchValue?: string;
	searchPlaceholder?: string;
	selectPlaceholder?: string;
	selectValue?: string;
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
	onSelectChange,
	onFilterClick,
	onReloadClick,
	searchValue,
	selectValue,
	searchPlaceholder = "Search something...",
	selectPlaceholder
}: Props) => {
	const intl = useIntl();

	return (
		<Flex gap={10} align="center">
			<Input
				allowClear
				prefix={<SearchOutlined color={THEME_COLORS.PRIMARY_COLOR} />}
				value={searchValue}
				onChange={(e) => {
					e.preventDefault();
					onSearchChange?.(e.target.value);
				}}
				placeholder={intl.formatMessage({ id: searchPlaceholder })}
				css={styles.input}
			/>
			<Select
				allowClear
				placeholder={intl.formatMessage({ id: selectPlaceholder })}
				value={selectValue === "" ? undefined : selectValue}
				onChange={onSelectChange}
				options={[
					{
						label: intl.formatMessage({ id: "general.yes" }),
						value: "true"
					},
					{
						label: intl.formatMessage({ id: "general.no" }),
						value: "false"
					}
				]}
				css={styles.select}
			/>
			{/* 
			<Tooltip title={intl.formatMessage({ id: 'component.page-header-filters.filters' })}>
				<Button
				icon={<FilterOutlined />}
				onClick={onFilterClick}
				css={styles.button}
				/>
			</Tooltip> 
	  */}
			<Tooltip
				title={intl.formatMessage({
					id: "component.page-header-filters.reload"
				})}
			>
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
