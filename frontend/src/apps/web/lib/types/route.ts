import { FC, Key, ReactNode } from "react";

export interface SingleRoute {
	key: Key;
	path: string;
	hidden?: boolean;
	title?: string;
	icon?: ReactNode;
	page: FC;
	children?: undefined;
}

export interface GroupedRoute {
	title?: string;
	children: SingleRoute[];
	icon?: ReactNode;
}

export type Route = SingleRoute | GroupedRoute;
