import { Route, Routes } from "react-router-dom";

import { useRedirectionWatcher } from "@web/lib/hooks/routing/use-watch";
import { getAllModulesRoutes } from "@web/modules";

const RouterSwitch = () => {
	const routes = getAllModulesRoutes()
		.map((route) => route.children ?? route)
		.flat();

	useRedirectionWatcher();

	return (
		<Routes>
			{routes.map((route) => (
				<Route key={route.key} path={route.path} element={<route.page />} />
			))}
		</Routes>
	);
};

export default RouterSwitch;
