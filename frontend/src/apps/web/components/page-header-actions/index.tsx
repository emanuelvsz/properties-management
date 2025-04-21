/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Dropdown, Flex, MenuProps, Tooltip } from "antd";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { THEME_COLORS } from "@web/config/theme";
import { useIntl } from "react-intl";

interface OrderByOption {
	key: string;
	label: string;
}

interface Props {
	onAddClick?: () => void;
	onOrderByChange?: (value: string) => void;
	orderByOptions?: OrderByOption[];
	disabled?: boolean;
	disableActions?: boolean;
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

const PageHeaderActions = ({
	onAddClick,
	onOrderByChange,
	orderByOptions,
	disabled = false,
	disableActions = false
}: Props) => {
	const intl = useIntl();

	const hasOptions = !!orderByOptions?.length;

	const [selectedKey, setSelectedKey] = useState<string>("");

	useEffect(() => {
		if (hasOptions && !selectedKey) {
			setSelectedKey(orderByOptions[0].key);
		}
	}, [hasOptions, orderByOptions, selectedKey]);

	const keyToLabelMap = useMemo(() => {
		if (!hasOptions) return {};
		return Object.fromEntries(
			orderByOptions.map((item) => [item.key, item.label])
		);
	}, [orderByOptions]);

	const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
		setSelectedKey(key);
		onOrderByChange?.(key);
	};

	if (disableActions) {
		return null;
	}

	return (
		<Flex css={styles.container} gap={10}>
			<Dropdown
				menu={{
					items: hasOptions
						? (orderByOptions as unknown as MenuProps["items"])
						: [],
					onClick: handleMenuClick
				}}
				trigger={["click"]}
				disabled={!hasOptions || disabled}
			>
				<Button css={styles.dropdownButton}>
					{keyToLabelMap[selectedKey] || "-"} <DownOutlined />
				</Button>
			</Dropdown>
			<Tooltip
				title={intl.formatMessage({
					id: "component.page-header-actions.tooltip.add"
				})}
			>
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
