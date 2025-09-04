import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { Flex, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import logoWhite from "@web/assets/images/logo-white.png";
import logoHouseWhite from "@web/assets/images/logo-house-white.svg";
import homeIcon from "@web/assets/icons/fi-rs-home.svg";
import chartHistogramIcon from "@web/assets/icons/fi-rs-chart-histogram.svg";
import chartHistogramIconWhite from "@web/assets/icons/fi-rs-chart-histogram-white.svg";
import homeIconWhite from "@web/assets/icons/fi-rs-home-white.svg";
import userIconWhite from "@web/assets/icons/user-white.svg";
import userIcon from "@web/assets/icons/user.svg";
import moneyIcon from "@web/assets/icons/fi-rs-money.svg";
import moneyIconWhite from "@web/assets/icons/fi-rs-money-white.svg";
import settingsIcon from "@web/assets/icons/fi-rs-settings.svg";
import settingsIconWhite from "@web/assets/icons/fi-rs-settings-white.svg";

import backpackIcon from "@web/assets/icons/fi-rs-backpack.svg";
import backpackIconWhite from "@web/assets/icons/fi-rs-backpack-white.svg";

import { THEME_COLORS } from "@web/config/theme";
import { useSideMenu } from "@web/lib/hooks/side-menu";
import { Account } from "@core/domain/models/account";
import { FormattedMessage, useIntl } from "react-intl";
import MenuItemsSection from "./menu-items-section";

interface Props {
	account?: Account;
}

export interface MenuNavigationItem {
	text: string;
	icon: string;
	activeIcon: string;
	url: string;
	isDemo?: boolean;
}

const styles = {
	sider: css`
		background-color: ${THEME_COLORS.PRIMARY_COLOR} !important;
		display: flex;
		flex-direction: column;
		height: 100vh;
	`,
	siderHeader: css`
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		border-bottom: 1px solid ${THEME_COLORS.PRIMARY_LIGHT_COLOR};
	`,
	logo: css`
		height: 55px;
	`,
	logoCollapsed: css`
		height: 40px;
	`,
	body: (collapsed: boolean) => css`
		padding: ${collapsed ? "0.3rem 1rem 0 1rem" : "0.3rem 1.8rem"};
	`,
	sectionTitle: (collapsed: boolean) => css`
		color: ${THEME_COLORS.WHITE_COLOR};
		font-weight: 600;
		height: 35px;
		opacity: ${collapsed ? 0 : 1};
		visibility: ${collapsed ? "hidden" : "visible"};
		transition: opacity 0.3s ease;
	`,
	navigationItem: (active: boolean, collapsed: boolean) => css`
		display: flex;
		align-items: center;
		justify-content: ${collapsed ? "center" : "flex-start"};
		gap: ${collapsed ? "0" : "15px"};
		padding: 0 ${collapsed ? "0" : "1rem"};
		height: 40px;
		cursor: pointer;
		border-radius: 8px;
		background-color: ${active ? "#fff" : "transparent"};
		transition: background-color 0.3s ease;

		&:hover {
			background-color: ${active ? "#fff" : "#ffffff33"};
		}
	`,
	icon: (active: boolean) => css`
		height: 20px;
		color: ${active ? THEME_COLORS.PRIMARY_COLOR : THEME_COLORS.WHITE_COLOR};
		transition: color 0.3s ease;
	`,
	text: (active: boolean) => css`
		font-weight: 500;
		color: ${active ? THEME_COLORS.PRIMARY_COLOR : THEME_COLORS.WHITE_COLOR};
		transition: color 0.3s ease;
		white-space: nowrap;
	`,
	toggleButton: (collapsed: boolean) => css`
		position: absolute;
		bottom: 16px;
		width: 100%;
		padding: ${collapsed ? "0 1rem" : "0 1.8rem"};
	`,
	toggleContent: (collapsed: boolean) => css`
		display: flex;
		align-items: center;
		justify-content: ${collapsed ? "center" : "flex-start"};
		gap: ${collapsed ? "0" : "15px"};
		height: 40px;
		cursor: pointer;
		border-radius: 8px;
		background-color: #fff;
		padding: 0 ${collapsed ? "0" : "1rem"};
		transition: all 0.3s ease;
		width: 100% !important;

		&:hover {
			background-color: #f0f0f0;
		}
	`,
	toggleText: css`
		font-weight: 500;
		color: ${THEME_COLORS.PRIMARY_COLOR};
		white-space: nowrap;
	`
};

const SideMenu = ({ account }: Props) => {
	const { collapsed, toggleCollapsed } = useSideMenu();
	const navigate = useNavigate();
	const intl = useIntl();

	if (!account) return null;

	const managementData: MenuNavigationItem[] = [
		{
			text: intl.formatMessage({
				id: "component.side-menu.section.pages.item.dashboard"
			}),
			icon: chartHistogramIconWhite,
			activeIcon: chartHistogramIcon,
			url: "/"
		},
		{
			text: intl.formatMessage({
				id: "component.side-menu.section.pages.item.properties"
			}),
			icon: homeIconWhite,
			activeIcon: homeIcon,
			url: "/properties"
		},
		{
			text: intl.formatMessage({
				id: "component.side-menu.section.pages.item.tenants"
			}),
			icon: userIconWhite,
			activeIcon: userIcon,
			url: "/tenants"
		},
		{
			text: intl.formatMessage({
				id: "component.side-menu.section.pages.item.payments"
			}),
			icon: moneyIconWhite,
			activeIcon: moneyIcon,
			url: "/payments",
			isDemo: true
		},
		{
			text: intl.formatMessage({
				id: "component.side-menu.section.pages.item.inventory"
			}),
			icon: backpackIconWhite,
			activeIcon: backpackIcon,
			url: "/inventory",
			isDemo: true
		}
	];

	const accountData: MenuNavigationItem[] = [
		{
			text: intl.formatMessage({
				id: "component.header.dropdown.configurations"
			}),
			icon: settingsIconWhite,
			activeIcon: settingsIcon,
			url: "/settings"
		},
		{
			text: intl.formatMessage({
				id: "component.side-menu.section.pages.item.profile"
			}),
			icon: userIconWhite,
			activeIcon: userIcon,
			url: "/profile",
			isDemo: true
		}
	];

	return (
		<Layout.Sider
			css={styles.sider}
			collapsed={collapsed}
			onCollapse={toggleCollapsed}
			width={300}
			collapsedWidth={80}
			theme="light"
			trigger={null}
			collapsible
		>
			<Flex vertical>
				<Flex css={styles.siderHeader} onClick={() => navigate("/")}>
					<img
						src={!collapsed ? logoWhite : logoHouseWhite}
						css={[styles.logo, collapsed && styles.logoCollapsed]}
					/>
				</Flex>
				<Flex vertical>
					<MenuItemsSection
						data={managementData}
						collapsed={collapsed}
						titleId="component.side-menu.section.pages.title"
					/>
					<MenuItemsSection
						data={accountData}
						collapsed={collapsed}
						titleId="component.side-menu.section.subpages.title"
					/>
				</Flex>
			</Flex>
			<Flex css={styles.toggleButton(collapsed)}>
				<Flex css={styles.toggleContent(collapsed)} onClick={toggleCollapsed}>
					{collapsed ? (
						<MenuUnfoldOutlined css={styles.icon(true)} />
					) : (
						<>
							<MenuFoldOutlined css={styles.icon(true)} />
							<p css={styles.toggleText}>
								<FormattedMessage id="component.side-menu.section.close.button.title" />
							</p>
						</>
					)}
				</Flex>
			</Flex>
		</Layout.Sider>
	);
};

export default SideMenu;
