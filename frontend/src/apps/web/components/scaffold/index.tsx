import { css } from "@emotion/react";
import { Layout } from "antd";

import ProviderManager from "@web/config/providers/manager";
import { useAccount } from "apps/web/lib/contexts/auth/hooks";

import SideMenu from "../menu";
import Router from "../router";
import Header from "../header";
import Footer from "../footer";
import I18nProvider from "@web/lib/contexts/i18n/provider";

const styles = {
	layout: css`
		height: 100vh;
	`,
	sideLayout: css`
		display: flex;
		flex-direction: row;
		flex: 1;
		overflow: hidden;
	`,
	mainContent: css`
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
	`,
	contentArea: css`
		flex: 1;
		overflow-y: auto;
	`
};

const Scaffold = () => {
	const account = useAccount();
	return (
		<ProviderManager account={account}>
			<I18nProvider>
				<Layout css={styles.layout}>
					<Layout css={styles.sideLayout}>
						<SideMenu account={account} />
						<Layout css={styles.mainContent}>
							<Header account={account} />
							<div css={styles.contentArea}>
								<Router />
								<Footer />
							</div>
						</Layout>
					</Layout>
				</Layout>
			</I18nProvider>
		</ProviderManager>
	);
};

export default Scaffold;
