import { css } from "@emotion/react";
import { Layout } from "antd";

import ProviderManager from "@web/config/providers/manager";
import { useAccount } from "apps/web/lib/contexts/auth/hooks";

import Header from "../header";
import SideMenu from "../menu";
import Router from "../router";

const styles = {
	container: css`
		height: 100vh;
	`,
	content: css`
		height: calc(100vh - 64px);
	`
};

const Scaffold = () => {
	const account = useAccount();
	return (
		<ProviderManager account={account}>
			<Layout css={styles.container}>
				<Header />
				<Layout css={styles.content}>
					<SideMenu account={account} />
					<Layout>
						<Router />
					</Layout>
				</Layout>
			</Layout>
		</ProviderManager>
	);
};

export default Scaffold;
