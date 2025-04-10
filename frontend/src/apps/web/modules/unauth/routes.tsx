import { Route } from "@web/lib/types/route";

import ForgotPasswordPage from "./pages/forgot-password";
import LoginPage from "./pages/login";
import RedefinePasswordPage from "./pages/redefine-password";

const getAuthRoutes = (): Route[] => [
	{
		key: 1,
		title: "Login",
		path: LoginPage.route,
		page: LoginPage,
		hidden: true
	},
	{
		key: 2,
		title: "Recover Password",
		path: ForgotPasswordPage.route,
		page: ForgotPasswordPage,
		hidden: true
	},
	{
		key: 3,
		title: "Change Password",
		path: RedefinePasswordPage.route,
		page: RedefinePasswordPage,
		hidden: true
	}
];

export default getAuthRoutes;
