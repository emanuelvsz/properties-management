import { Divider, Flex, Dropdown, MenuProps } from "antd";
import { css } from "@emotion/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useIntl } from "react-intl";

import { THEME_COLORS } from "@web/config/theme";

import userPrimaryIcon from "@web/assets/icons/user.svg";
import homeIcon from "@web/assets/icons/fi-rs-home.svg";
import chartHistogramIcon from "@web/assets/icons/fi-rs-chart-histogram.svg";
import userIcon from "@web/assets/icons/user.svg";
import moneyIcon from "@web/assets/icons/fi-rs-money.svg";
import { useLogout } from "@web/lib/contexts/auth/hooks";
import { Account } from "@core/domain/models/account";
import SelectLanguageDropdown from "../select-language-dropdown";
import { LogoutOutlined } from "@ant-design/icons";

const HEADER_TEXT_FONT_SIZES = 17;
const HEADER_HEIGHT = 100;

const styles = {
	header: css`
		width: 100%;
		min-height: ${HEADER_HEIGHT}px !important;
		height: ${HEADER_HEIGHT}px !important;
		padding-inline: 2.5rem;
		background-color: ${THEME_COLORS.WHITE_COLOR};
		position: sticky;
		top: 0;
		z-index: 999;
	`,
	headerUsername: css`
		color: ${THEME_COLORS.PRIMARY_COLOR};
		text-align: center;
		font-size: ${HEADER_TEXT_FONT_SIZES}px;
		font-weight: 500;
	`,
	headerIcon: css`
		height: ${HEADER_TEXT_FONT_SIZES}px !important;
		cursor: pointer;
	`,
	profileContainer: css`
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 15px;
		padding: 8px 12px;
		border-radius: 8px;
		transition: background-color 0.3s ease;

		&:hover {
			background-color: #f5f5f5;
		}
	`,
	divider: css`
		height: ${HEADER_HEIGHT / 3}px;
		background-color: #acacac;
	`,
	dropdownItem: css`
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 4px 16px;
		height: 25px;
	`,
	dropdownIcon: css`
		height: 16px;
		width: 16px;
	`
};

interface Props {
	account?: Account;
}

const Header = ({ account }: Props) => {
	const intl = useIntl();
	const navigate = useNavigate();
	const location = useLocation();
	const logout = useLogout();

	if (!account) {
		return null;
	}

	const handleMenuClick = ({ key }: { key: string }) => {
		switch (key) {
			case "dashboard":
				navigate("/");
				break;
			case "properties":
				navigate("/properties");
				break;
			case "tenants":
				navigate("/tenants");
				break;
			case "payments":
				navigate("/payments");
				break;
			case "inventory":
				navigate("/inventory");
				break;
			case "configurations":
				handleConfigClick();
				break;
			case "profile":
				handleProfileClick();
				break;
			case "logout":
				logout();
				break;
		}
	};

	const handleConfigClick = () => {
	};

	const handleProfileClick = () => {
		navigate("/profile");
	};

	const isActive = (path: string) => {
		return (
			location.pathname === path || location.pathname.startsWith(`${path}/`)
		);
	};

	const menuItems: MenuProps["items"] = [
		{
			key: "dashboard",
			label: (
				<div css={styles.dropdownItem}>
					<img src={chartHistogramIcon} css={styles.dropdownIcon} />
					{intl.formatMessage({ id: "component.header.dropdown.dashboard" })}
				</div>
			),
			style: isActive("/") ? { backgroundColor: "#f0f0f0" } : {}
		},
		{
			key: "properties",
			label: (
				<div css={styles.dropdownItem}>
					<img src={homeIcon} css={styles.dropdownIcon} />
					{intl.formatMessage({ id: "component.header.dropdown.properties" })}
				</div>
			),
			style: isActive("/properties") ? { backgroundColor: "#f0f0f0" } : {}
		},
		{
			key: "tenants",
			label: (
				<div css={styles.dropdownItem}>
					<img src={userIcon} css={styles.dropdownIcon} />
					{intl.formatMessage({ id: "component.header.dropdown.tenants" })}
				</div>
			),
			style: isActive("/tenants") ? { backgroundColor: "#f0f0f0" } : {}
		},
		{
			key: "payments",
			label: (
				<div css={styles.dropdownItem}>
					<img src={moneyIcon} css={styles.dropdownIcon} />
					{intl.formatMessage({ id: "component.header.dropdown.payments" })}
				</div>
			),
			style: isActive("/payments") ? { backgroundColor: "#f0f0f0" } : {}
		},
		{
			key: "inventory",
			label: (
				<div css={styles.dropdownItem}>
					<img src={homeIcon} css={styles.dropdownIcon} />
					{intl.formatMessage({ id: "component.header.dropdown.inventory" })}
				</div>
			),
			style: isActive("/inventory") ? { backgroundColor: "#f0f0f0" } : {}
		},
		{
			type: "divider",
			style: { margin: "4px 0" }
		},
		{
			key: "configurations",
			label: (
				<div css={styles.dropdownItem}>
					<img src={chartHistogramIcon} css={styles.dropdownIcon} />
					{intl.formatMessage({
						id: "component.header.dropdown.configurations"
					})}
				</div>
			)
		},
		{
			key: "profile",
			label: (
				<div css={styles.dropdownItem}>
					<img src={userIcon} css={styles.dropdownIcon} />
					{intl.formatMessage({ id: "component.header.dropdown.profile" })}
				</div>
			)
		},
		{
			type: "divider",
			style: { margin: "4px 0" }
		},
		{
			key: "logout",
			label: (
				<div css={styles.dropdownItem} style={{ color: "#ff4d4f" }}>
					<LogoutOutlined style={{ color: "#ff4d4f", fontSize: 18 }} />
					{intl.formatMessage({ id: "component.header.dropdown.logout" })}
				</div>
			),
			style: { color: "#ff4d4f" }
		}
	];

	return (
		<Flex css={styles.header} align="center" justify="right" gap={15}>
			<SelectLanguageDropdown />
			<Divider css={styles.divider} type="vertical" />
			<Dropdown
				menu={{ items: menuItems, onClick: handleMenuClick }}
				placement="bottomRight"
				trigger={["click"]}
			>
				<Flex css={styles.profileContainer}>
					<img src={userPrimaryIcon} css={styles.headerIcon} />
					<p css={styles.headerUsername}>{account?.email}</p>
				</Flex>
			</Dropdown>
		</Flex>
	);
};

export default Header;
