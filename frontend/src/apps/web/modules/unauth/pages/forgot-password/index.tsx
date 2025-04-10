import { css } from "@emotion/react";

import Page from "@web/components/page";
import { useStyleHelpers } from "@web/config/theme/hooks";
import ResetPasswordForm from "@web/modules/unauth/pages/forgot-password/components/form";

import UnauthHeader from "../../components/header";

const useDynamicStyles = () => {
	const { token } = useStyleHelpers();
	return {
		container: css`
			height: 100svh;
			width: 100%;
			padding-inline: 2rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			@media (max-height: 800px) {
				justify-content: flex-start !important;
			}
		`,
		titleContainer: css`
			max-width: 500px;
			width: 100%;
			margin-bottom: 2rem;
			@media (max-height: 800px) {
				margin-top: 4rem;
			}
		`,
		title: css`
			width: fit-content;
			margin-block: 0px !important;
			color: ${token.colorPrimary} !important;

			@media (max-width: 600px) {
				font-size: 2rem !important;
			}
		`,
		subtitle: css`
			font-size: 1.25rem;

			@media (max-width: 800px) {
				font-size: 1rem !important;
			}
		`
	};
};

const ForgotPasswordPage = () => {
	const styles = useDynamicStyles();

	return (
		<Page css={styles.container}>
			<UnauthHeader />
			<ResetPasswordForm />
		</Page>
	);
};

ForgotPasswordPage.route = "/recover-password";

export default ForgotPasswordPage;
