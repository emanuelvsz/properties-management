import { UserOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { App, Dropdown, Flex, Layout, MenuProps, Typography } from "antd";

import { IoExitOutline } from "react-icons/io5";

import { useStyleHelpers } from "@web/config/theme/hooks";
import { useAccount, useLogout } from "@web/lib/contexts/auth/hooks";

import { captalize } from "../../lib/utils/strings";

const useDynamicStyles = () => {
	const { token } = useStyleHelpers();
	return {
		container: css`
			display: flex;
			align-items: center;
			padding: 2rem;
			background-color: white;
			box-shadow: 1px 0px 5px 1px rgba(69, 51, 51, 0.1);
			z-index: 3;
		`,
		title: css`
			margin-block: 0px !important;
			color: ${token.colorPrimary} !important;
		`,
		wrapper: css`
			width: 100%;
		`,
		contextMenu: css`
      display: flex;
      align-items: center;

      position: relative;
      padding: 0.5rem 1rem 0.5rem 2rem;

      border: 2px solid white;
      box-shadow: 1px 0 3px 1px rgba(0, 0, 0, 0.25);
      border-radius: 4px;

      cursor: pointer;

      svg {
        transition: all 0.3s;
      }

      svg:first-of-type {
        position: absolute;
        left: -15px;
        height: 40px;
        width: 40px;

        padding: 0.5rem;
        font-size: 1.75rem !important;
        color: gray;

        border-radius: 32px;
        background-color: white;
        box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.25);
        z-index: 3;
      }

      span {
        line-height: 1;
        font-size: 1rem !important;
      }

      &:focus,
      &:active,
      &:hover {
        background-color: white;

        svg:first-of-type {
          color: var(--color-primary);
          background-color: white;
        }

        span {
          color: var(--color-primary);
        }
      }
    }`
	};
};

const Header = () => {
	const styles = useDynamicStyles();
	const account = useAccount();
	const logout = useLogout();
	const { modal } = App.useApp();

	if (!account) {
		return null;
	}

	const handleLogout = () => {
		modal.confirm({
			title: "Tem certeza que deseja sair da plataforma?",
			onOk: logout
		});
	};

	const userContextMenuItems = [
		{
			key: 0,
			label: "Sair",
			icon: <IoExitOutline />,
			onClick: handleLogout,
			danger: true
		}
	] as MenuProps["items"];

	const contextMenu = { items: userContextMenuItems };

	return (
		<Layout.Header css={styles.container} title="Project Template">
			<Flex css={styles.wrapper} align="center" justify="space-between">
				<Typography.Title level={1} css={styles.title}>
					Project Template
				</Typography.Title>
				<Dropdown menu={contextMenu} trigger={["click"]}>
					<div css={styles.contextMenu}>
						<UserOutlined />
						<Typography.Text>{captalize(account.name, true)}</Typography.Text>
					</div>
				</Dropdown>
			</Flex>
		</Layout.Header>
	);
};

export default Header;
