import { css } from "@emotion/react";
import { Input, Button, Flex, Tooltip, Select } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";
import { THEME_COLORS } from "@web/config/theme";
import { useMemo, useState } from "react";
import debounce from "lodash.debounce";

interface Props {
	onSearchChange?: (value: string) => void;
	onSelectChange?: (value: string) => void;
	onReloadClick?: () => void;
	searchValue?: string;
	searchPlaceholder?: string;
	selectPlaceholder?: string;
	selectValue?: string;
	selectOptions?: { label: string; value: string }[];
	disabled?: boolean;
	hideActions?: boolean;
	hideSelect?: boolean;
	hideSearch?: boolean;
	valueLabel?: string;
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
	onReloadClick,
	searchValue,
	selectValue,
	searchPlaceholder = "Search something...",
	selectPlaceholder,
	selectOptions,
	disabled = false,
	hideActions = false,
	hideSelect = false,
	valueLabel = ""
}: Props) => {
	const intl = useIntl();
	const [localSearchValue, setLocalSearchValue] = useState(searchValue ?? "");

	const debouncedSearch = useMemo(
		() =>
			debounce((val: string) => {
				onSearchChange?.(val);
			}, 500),
		[onSearchChange]
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setLocalSearchValue(val);
		debouncedSearch(val);
	};

	if (hideActions) {
		return null;
	}

	return (
		<Flex gap={10} align="center">
			<Input
				allowClear
				prefix={<SearchOutlined color={THEME_COLORS.PRIMARY_COLOR} />}
				value={localSearchValue}
				onChange={handleInputChange}
				placeholder={searchPlaceholder}
				css={styles.input}
				disabled={disabled}
			/>
			{!hideSelect && (
				<Select
					allowClear
					placeholder={selectPlaceholder}
					value={selectValue === "" ? undefined : selectValue}
					onChange={onSelectChange}
					options={
						selectOptions || [
							{
								label: `${valueLabel}: ${intl.formatMessage({ id: "general.yes" })}`,
								value: "true"
							},
							{
								label: `${valueLabel}: ${intl.formatMessage({ id: "general.no" })}`,
								value: "false"
							}
						]
					}
					css={styles.select}
					disabled={disabled}
				/>
			)}
			<Tooltip
				title={intl.formatMessage({
					id: "component.page-header-filters.reload"
				})}
			>
				<Button
					icon={<ReloadOutlined />}
					onClick={onReloadClick}
					css={styles.button}
					disabled={disabled}
				/>
			</Tooltip>
		</Flex>
	);
};

export default PageHeaderFilters;
