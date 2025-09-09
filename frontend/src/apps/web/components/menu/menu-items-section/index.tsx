import { Badge, Flex, Tag, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { MenuNavigationItem } from "..";
import { THEME_COLORS } from "@web/config/theme";
import { css } from "@emotion/react";

interface Props {
	data: MenuNavigationItem[];
	titleId: string;
	collapsed?: boolean;
}

const styles = {
	body: (collapsed: boolean) => css`
		padding: ${collapsed ? "0.3rem 1rem 0 1rem" : "0.3rem 1.8rem"};
	`,
	sectionTitle: (collapsed: boolean) => css`
		color: ${THEME_COLORS.WHITE_COLOR};
		font-weight: 600;
		opacity: ${collapsed ? 0 : 1};
		visibility: ${collapsed ? "hidden" : "visible"};
		transition: opacity 0.3s ease;
	`,
	navigationItem: (
		active: boolean,
		collapsed: boolean,
		isDisabled?: boolean
	) => css`
		display: flex;
		align-items: center;
		justify-content: ${collapsed ? "center" : "flex-start"};
		gap: ${collapsed ? "0" : "15px"};
		padding: 0 ${collapsed ? "0" : "1rem"};
		height: 40px;
		cursor: ${isDisabled ? "not-allowed" : "pointer"};
		border-radius: 8px;
		background-color: ${active ? "#fff" : "transparent"};
		transition: background-color 0.3s ease;

		&:hover {
			background-color: ${active || isDisabled ? "#fff" : "#ffffff33"};
		}
	`,
	icon: (active: boolean) => css`
		height: 20px;
		color: ${active ? THEME_COLORS.PRIMARY_COLOR : THEME_COLORS.WHITE_COLOR};
		transition: color 0.3s ease;
	`,
	text: (active: boolean, isDisabled?: boolean) => css`
		font-weight: 500;
		color: ${isDisabled
			? "#bfbfbf"
			: active
				? THEME_COLORS.PRIMARY_COLOR
				: THEME_COLORS.WHITE_COLOR};
		transition: color 0.3s ease;
		white-space: nowrap;
	`,
	toggleText: css`
		font-weight: 500;
		color: ${THEME_COLORS.PRIMARY_COLOR};
		white-space: nowrap;
	`,
	tag: css`
		font-size: 11px;
		height: 24px;
		padding: 1px 4px 0 4px;
	`
};

const MenuItemsSection = ({ data, titleId, collapsed = false }: Props) => {
	const navigate = useNavigate();

	return (
		<Flex css={styles.body(collapsed)} vertical gap={5}>
			<p css={styles.sectionTitle(collapsed)}>
				<FormattedMessage id={titleId} />
			</p>
			<Flex vertical gap={10}>
				{data.map((item, idx) => {
					const isActive =
						location.pathname === item.url ||
						location.pathname.startsWith(`${item.url}/`);
					const isDisabled = item.disabled;
					const isDemo = item.isDemo;

					return (
						<Flex
							key={idx}
							css={styles.navigationItem(isActive, collapsed, isDisabled)}
							onClick={() => {
								if (!isDisabled) {
									navigate(item.url);
								}
							}}
						>
							<img
								src={isActive ? item.activeIcon : item.icon}
								css={styles.icon(isActive)}
							/>
							{!collapsed && (
								<p css={styles.text(isActive, isDisabled)}>{item.text}</p>
							)}
							{!collapsed && isDemo && (
								<Tooltip
									title="Some things might not work as well"
									placement="right"
								>
									<Tag color="success" css={styles.tag}>
										DEMO
									</Tag>
								</Tooltip>
							)}
						</Flex>
					);
				})}
			</Flex>
		</Flex>
	);
};

export default MenuItemsSection;
