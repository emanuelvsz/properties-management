import { Route } from "@web/lib/types/route";

import HomePage from "../auth/pages/home";
import PropertiesPage from "./pages/properties";
import PropertyPage from "./pages/property";

const getAuthRoutes = (): Route[] => [
	{
		key: 1,
		title: "Dashboard",
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
	},
	{
		key: 3,
		title: "Property",
		path: "/properties/:id",
		page: PropertyPage,
		hidden: true
	}
];

export default getAuthRoutes;
