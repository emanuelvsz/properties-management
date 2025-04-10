import { Account } from "@core/domain/models/account";

import { Route } from "@web/lib/types/route";

import UnauthRoutes from "./unauth/routes";
import AuthRoutes from "./auth/routes";

export const getModuleRoutesByAccount = (account?: Account): Route[] =>
	account ? AuthRoutes() : UnauthRoutes();

export const getAllModulesRoutes = (): Route[] => [...UnauthRoutes(), ...AuthRoutes()];
