import { Account } from "@core/domain/models/account";

import { Route } from "@web/lib/types/route";

import UnauthRoutes from "./unauth/routes";

export const getModuleRoutesByAccount = (account?: Account): Route[] =>
	account?.isAdmin ? [] : UnauthRoutes();

export const getAllModulesRoutes = (): Route[] => [...UnauthRoutes()];
