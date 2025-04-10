import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Flex, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import logoWhite from "@web/assets/images/logo-white.png";
import logoHouseWhite from "@web/assets/images/logo-house-white.svg";
import homeIcon from "@web/assets/icons/fi-rs-home.svg";
import chartHistogramIcon from "@web/assets/icons/fi-rs-chart-histogram.svg";
import chartHistogramIconWhite from "@web/assets/icons/fi-rs-chart-histogram-white.svg";
import homeIconWhite from "@web/assets/icons/fi-rs-home-white.svg";
import userIcon from "@web/assets/icons/user.svg";
import userIconWhite from "@web/assets/icons/user-white.svg";

import { THEME_COLORS } from "@web/config/theme";
import { useSideMenu } from "@web/lib/hooks/side-menu";
import { Account } from "@core/domain/models/account";

interface Props {
	account?: Account;
}

interface NavigationItem {
	text: string;
	icon: string;
	activeIcon: string;
	url: string;
}

const styles = {
	sider: css`
		background-color: ${THEME_COLORS.PRIMARY_COLOR} !important;
		height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
	`,
	siderHeader: css`
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	`,
	logo: css`
		height: 55px;
	`,
	logoCollapsed: css`
		height: 40px;
	`,
	body: (collapsed: boolean) => css`
		flex: 1;
		padding: ${collapsed ? "0.3rem 1rem 0 1rem" : "0.3rem 1.8rem"};
		overflow: none;
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
	const location = useLocation();

	if (!account) return null;

	const data: NavigationItem[] = [
		{
			text: "Control Panel",
			icon: chartHistogramIconWhite,
			activeIcon: chartHistogramIcon,
			url: "/"
		},
		{
			text: "Properties",
			icon: homeIconWhite,
			activeIcon: homeIcon,
			url: "/properties"
		},
		{
			text: "Tenants",
			icon: userIconWhite,
			activeIcon: userIcon,
			url: "/tenants"
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
				<Flex css={styles.body(collapsed)} vertical gap={10}>
					<p css={styles.sectionTitle(collapsed)}>PAGES</p>
					{data.map((item, idx) => {
						const isActive = location.pathname === item.url;
						return (
							<Flex
								key={idx}
								css={styles.navigationItem(isActive, collapsed)}
								onClick={() => navigate(item.url)}
							>
								<img
									src={isActive ? item.activeIcon : item.icon}
									css={styles.icon(isActive)}
								/>
								{!collapsed && <p css={styles.text(isActive)}>{item.text}</p>}
							</Flex>
						);
					})}
				</Flex>
			</Flex>

			<Flex css={styles.toggleButton(collapsed)}>
				<Flex css={styles.toggleContent(collapsed)} onClick={toggleCollapsed}>
					{collapsed ? (
						<MenuUnfoldOutlined css={styles.icon(true)} />
					) : (
						<>
							<MenuFoldOutlined css={styles.icon(true)} />
							<p css={styles.toggleText}>Close menu</p>
						</>
					)}
				</Flex>
			</Flex>
		</Layout.Sider>
	);
};

export default SideMenu;
