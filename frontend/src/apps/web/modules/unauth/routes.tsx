import { Route } from "@web/lib/types/route";

import ForgotPasswordPage from "./pages/forgot-password";
import LoginPage from "./pages/login";
import RedefinePasswordPage from "./pages/redefine-password";

const getRoutes = (): Route[] => [
	{
		key: 1,
		title: "Entrar",
		path: LoginPage.route,
		page: LoginPage,
		hidden: true
	},
	{
		key: 2,
		title: "Recuperar Senha",
		path: ForgotPasswordPage.route,
		page: ForgotPasswordPage,
		hidden: true
	},
	{
		key: 3,
		title: "Redefinir Senha",
		path: RedefinePasswordPage.route,
		page: RedefinePasswordPage,
		hidden: true
	}
];

export default getRoutes;
