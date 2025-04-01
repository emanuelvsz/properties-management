import { isEqual } from "lodash";

const formatWithArgs = (pathname: string, args?: Record<string, unknown>) => {
	if (!args || !Object.keys(args)) {
		return pathname;
	}
	let formattedPathname = pathname;
	Object.entries(args).forEach(([key, value]) => {
		formattedPathname = formattedPathname.replace(
			new RegExp(`/${value}/?`),
			`/:${key}/`
		);
	});
	return formattedPathname;
};

const formatWithParams = (pathname: string, availablePaths: string[]) => {
	let formattedPath = pathname;
	const splittedPathname = pathname.split("/");
	const formattedPaths = availablePaths.map((item) =>
		item.endsWith("/") ? item.slice(0, -1) : item
	);
	formattedPaths.forEach((path) => {
		const formattedPathWithRegex = formattedPath.split("/");
		const splittedPath = path.split("/");
		if (splittedPathname.length !== splittedPath.length) {
			return;
		}
		splittedPath.forEach((_, index) => {
			const pathPart = splittedPath[index];
			if (!pathPart) {
				return;
			}
			const match = pathPart.match(/(:[1-9A-Z_a-z-]+)/g);
			if (!match) {
				if (pathPart !== formattedPathWithRegex[index]) {
					return;
				}
				return;
			}
			if (!formattedPathWithRegex[index]) {
				return;
			}
			const [firstMatch] = match[0];
			formattedPathWithRegex[index] = firstMatch;
		});
		if (formattedPathWithRegex.join("/") !== formattedPath) {
			formattedPath = formattedPathWithRegex.join("/");
		}
	});
	return formattedPath;
};

const areRoutesEqual = (firstRoute: string, secondRoute: string) => {
	let formattedFirstRoute = firstRoute;
	let formattedSecondRoute = secondRoute;
	if (firstRoute.endsWith("/")) {
		formattedFirstRoute = firstRoute.slice(
			0,
			Math.max(0, firstRoute.length - 1)
		);
	}
	if (secondRoute.endsWith("/")) {
		formattedSecondRoute = secondRoute.slice(
			0,
			Math.max(0, secondRoute.length - 1)
		);
	}
	return isEqual(formattedFirstRoute, formattedSecondRoute);
};

export function useFormatRoute() {
	return { formatWithArgs, formatWithParams, areRoutesEqual };
}
