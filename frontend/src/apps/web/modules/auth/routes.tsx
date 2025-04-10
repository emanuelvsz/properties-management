import { Route } from "@web/lib/types/route";

import HomePage from "../auth/pages/home";
import PropertiesPage from "./pages/properties";

const getUnauthRoutes = (): Route[] => [
	{
		key: 1,
		title: "Rents",
		path: HomePage.route,
		page: HomePage,
		hidden: true
	},
	{
		key: 2,
		title: "Properties",
		path: PropertiesPage.route,
		page: PropertiesPage,
		hidden: true
	}
];

export default getUnauthRoutes;
