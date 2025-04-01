import { Grid } from "antd";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { useAccount } from "apps/web/lib/contexts/auth/hooks";
import { useFormatRoute } from "apps/web/lib/hooks/routing/use-formatted-route";
import { getModuleRoutesByAccount } from "apps/web/modules";

interface SelectEvent {
	selectedKeys: string[];
}

export const useSideMenu = () => {
	const account = useAccount();
	const navigate = useNavigate();
	const location = useLocation();
	const breakpoints = Grid.useBreakpoint();
	const [collapsed, setCollapsed] = useState(window.innerWidth < 992);
	const routes = useMemo(
		() =>
			getModuleRoutesByAccount(account).map((route, idx) => {
				const key = idx.toString();
				if (route.children) {
					return {
						...route,
						key,
						label: route.title,
						children: route.children.map((child, childIdx) => ({
							...child,
							label: child.title,
							key: `${key}-${childIdx}`
						}))
					};
				}
				return { ...route, label: route.title, key };
			}),
		[account]
	);
	const [selected, setSelected] = useState<string>(
		routes[0]?.key?.toString() ?? ""
	);
	const { formatWithArgs } = useFormatRoute();

	const handleResize = useCallback(() => {
		if (!breakpoints.lg) {
			setCollapsed(true);
		} else {
			setCollapsed(false);
		}
	}, [breakpoints.lg]);

	useEffect(() => {
		handleResize();
	}, [breakpoints, handleResize]);

	useEffect(() => {
		const formattedRoute = formatWithArgs(location.pathname, location.state);
		const activeRoute = routes
			.map((route) => route.children ?? route)
			.flat()
			.find((route) => route.path === formattedRoute);
		if (activeRoute) {
			setSelected(activeRoute.key.toString());
		}
	}, [formatWithArgs, location, routes]);

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	const handleSelect = ({ selectedKeys }: SelectEvent) => {
		const selectedKey = selectedKeys[0];
		setSelected(selectedKey);
		const selectedRoute = routes.find((route) =>
			route.children
				? route.children.find((subRoute) => subRoute.key === selectedKey)
				: route.key === selectedKey
		);
		if (!selectedRoute) {
			return;
		}
		if (selectedRoute.children) {
			navigate(
				selectedRoute.children.find((subRoute) => subRoute.key === selectedKey)!
					.path
			);
		} else if (!selectedRoute.children) {
			navigate(selectedRoute!.path);
		}
	};

	const items = routes
		.filter((route) => (route.children ? true : !route.hidden))
		.map((route) => ({
			...route,
			children: route.children?.filter((child) => !child.hidden)
		}));

	return {
		items,
		collapsed,
		selected,
		toggleCollapsed,
		handleSelect
	};
};
