import { Route } from "@web/lib/types/route";

import HomePage from "../auth/pages/home";
import PropertiesPage from "./pages/properties";
import PropertyPage from "./pages/property";
import TenantsPage from "./pages/tenants";

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
		path: PropertyPage.route,
		page: PropertyPage,
		hidden: true
	},
	{
		key: 3,
		title: "Tenants",
		path: TenantsPage.route,
		page: TenantsPage,
		hidden: true
	},
];

export default getAuthRoutes;
