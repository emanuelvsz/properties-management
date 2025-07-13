import { Route } from "@web/lib/types/route";

import HomePage from "../auth/pages/home";
import PropertiesPage from "./pages/properties";
import PropertyPage from "./pages/property";
import TenantsPage from "./pages/tenants";
import InventoryPage from "./pages/inventory";
import PaymentsPage from "./pages/payments";

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
		key: 4,
		title: "Tenants",
		path: TenantsPage.route,
		page: TenantsPage,
		hidden: true
	},
	{
		key: 5,
		title: "Inventário",
		path: "/inventory",
		page: InventoryPage,
		hidden: false
	},
	{
		key: 8,
		title: "Pagamentos",
		path: "/payments",
		page: PaymentsPage,
		hidden: false
	}
];

export default getAuthRoutes;
