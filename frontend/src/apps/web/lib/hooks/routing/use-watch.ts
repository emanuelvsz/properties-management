import { isNil } from "lodash";

import { useCallback, useEffect } from "react";

import { matchPath, useLocation, useNavigate } from "react-router-dom";

import { useAccount } from "apps/web/lib/contexts/auth/hooks";
import { useFormatRoute } from "apps/web/lib/hooks/routing/use-formatted-route";
import { getModuleRoutesByAccount } from "apps/web/modules";

export const useRedirectionWatcher = () => {
	const account = useAccount();
	const routes = getModuleRoutesByAccount(account);
	const navigate = useNavigate();
	const location = useLocation();
	const { formatWithArgs, areRoutesEqual } = useFormatRoute();

	const redirectToFirstModuleRoute = useCallback(() => {
		const firstRoute = routes[0];
		if (firstRoute.children) {
			navigate(firstRoute.children[0].path);
		} else {
			navigate(firstRoute.path);
		}
	}, [navigate, routes]);

	const watch = useCallback(() => {
		const activeRoute = routes
		.map((route) => route.children ?? route)
		.flat()
		.find((route) => matchPath(route.path, location.pathname));
		if (isNil(activeRoute)) {
			redirectToFirstModuleRoute();
			return;
		}
		document.title = `Property Manager${
			activeRoute ? ` - ${activeRoute.title}` : ""
		}`;
		const pageTitle = document.querySelector<HTMLHeadingElement>("#page-title");
		if (!pageTitle) {
			return;
		}
		pageTitle.textContent = activeRoute.title ?? "";
	}, [
		areRoutesEqual,
		formatWithArgs,
		location.pathname,
		location.state,
		redirectToFirstModuleRoute,
		routes
	]);

	useEffect(() => watch(), [location, routes, account, watch]);
};
