import { css } from "@emotion/react";

import Page from "@web/components/page";

import LoginForm from "./components/form";
import UnauthHeader from "../../components/header";

const styles = {
	container: css`
		height: 100svh;
		width: 100%;
		padding-inline: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		@media (max-height: 800px) {
			justify-content: flex-start !important;
		}
	`
};

const LoginPage = () => (
	<Page css={styles.container} hideTitle>
		<UnauthHeader />
		<LoginForm />
	</Page>
);

LoginPage.route = "/login";

export default LoginPage;
