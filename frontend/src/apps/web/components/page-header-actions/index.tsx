/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Dropdown, Flex, MenuProps, Tooltip } from "antd";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { THEME_COLORS } from "@web/config/theme";
import { useIntl } from "react-intl";

interface Props {
	onAddClick?: () => void;
	onOrderByChange?: (orderBy: string) => void;
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

const PageHeaderActions = ({ onAddClick, onOrderByChange }: Props) => {
	const [selectedKey, setSelectedKey] = useState("newest");
	const intl = useIntl();

	const sortOptions = useMemo(
		() => [
			{
				key: "newest",
				label: intl.formatMessage({
					id: "component.page-header-actions.sort.newest"
				})
			},
			{
				key: "oldest",
				label: intl.formatMessage({
					id: "component.page-header-actions.sort.oldest"
				})
			},
			{
				key: "price_high",
				label: intl.formatMessage({
					id: "component.page-header-actions.sort.price_high"
				})
			},
			{
				key: "price_low",
				label: intl.formatMessage({
					id: "component.page-header-actions.sort.price_low"
				})
			},
			{
				key: "most_bedrooms",
				label: intl.formatMessage({
					id: "component.page-header-actions.sort.most_bedrooms"
				})
			},
			{
				key: "most_bathrooms",
				label: intl.formatMessage({
					id: "component.page-header-actions.sort.most_bathrooms"
				})
			},
			{
				key: "less_bedrooms",
				label: intl.formatMessage({
					id: "component.page-header-actions.sort.less_bedrooms"
				})
			},
			{
				key: "less_bathrooms",
				label: intl.formatMessage({
					id: "component.page-header-actions.sort.less_bathrooms"
				})
			}
		],
		[intl]
	);

	const keyToLabelMap = Object.fromEntries(
		sortOptions.map((item) => [item.key, item.label])
	);

	const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
		setSelectedKey(key);
		onOrderByChange?.(key);
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
