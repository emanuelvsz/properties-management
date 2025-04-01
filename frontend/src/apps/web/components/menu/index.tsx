import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";

import { Button, Layout, Menu } from "antd";

import { Account } from "@core/domain/models/account";

import { useSideMenu } from "../../lib/hooks/side-menu";

interface Props {
	account?: Account;
}

const styles = {
	toggleButton: css`
		width: 100% !important;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		margin: 0.5rem 0;
		height: 40px;
		border: unset;

		svg {
			font-size: 20px;
		}
	`,
	menu: css`
		height: 100%;
		display: flex;
		flex-direction: column-reverse !important;
		padding-top: 1rem;
		box-shadow: 1px 0px 10px 1px rgba(0, 0, 0, 0.1);
		z-index: 2;

		.ant-layout-sider-trigger {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.ant-menu {
			border-right: unset !important;
		}
	`
};

const SideMenu = ({ account }: Props) => {
	const { items, collapsed, selected, toggleCollapsed, handleSelect } =
		useSideMenu();

	if (!account) {
		return null;
	}

	return (
		<Layout.Sider
			css={styles.menu}
			collapsed={collapsed}
			onCollapse={toggleCollapsed}
			width={300}
			collapsedWidth={80}
			theme="light"
			trigger={
				<Button
					type="text"
					css={[styles.toggleButton]}
					icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
					onClick={toggleCollapsed}
				/>
			}
			collapsible
		>
			<Menu
				mode="inline"
				theme="light"
				items={items}
				selectedKeys={[selected]}
				onSelect={handleSelect}
			/>
		</Layout.Sider>
	);
};

export default SideMenu;
