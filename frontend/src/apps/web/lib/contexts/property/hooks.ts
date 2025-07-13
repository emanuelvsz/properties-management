import { App } from "antd";
import { AxiosError } from "axios";
import { useContextSelector } from "use-context-selector";

import AppError from "core/helper/error";

import { PropertyCTX } from ".";
import { useLogout } from "../auth/hooks";

export function useListProperties() {
	return useContextSelector(PropertyCTX, (ctx) => ctx.list);
}

export function useDeleteProperty() {
	return useContextSelector(PropertyCTX, (ctx) => ctx.deleteProperty);
}

export function useCreateProperty() {
	return useContextSelector(PropertyCTX, (ctx) => ctx.create);
}

export function useListPropertyByID() {
	return useContextSelector(PropertyCTX, (ctx) => ctx.listByID);
}

export function useListPropertyContracts() {
	return useContextSelector(PropertyCTX, (ctx) => ctx.listPropertyContracts);
}

export function useUpdateProperty() {
	return useContextSelector(PropertyCTX, (ctx) => ctx.update);
}

export function useListPropertyExpenses() {
	return useContextSelector(PropertyCTX, (ctx) => ctx.listPropertyExpenses);
}

const treatAxiosError = (error: AxiosError): [string, boolean] => {
	let msg: string | undefined;
	let shouldLogout: boolean = false;
	switch (error.response?.status) {
		case 401:
			shouldLogout = true;
			msg = "Your session has expired. Please login again.";
			break;
		case 403:
			shouldLogout = true;
			msg =
				"Oops! Some functionality you don't have permission for was activated. Please login again.";
			break;
		default:
			msg = AppError.messages.UNEXPECTED;
			break;
	}
	return [msg, shouldLogout];
};

const treatError = (error: unknown): [string, boolean] => {
	if (!error) {
		return [AppError.messages.UNEXPECTED, false];
	}
	let msg: string | undefined;
	let shouldLogout: boolean = false;
	if (error instanceof AxiosError) {
		return treatAxiosError(error);
	}
	if (error instanceof AppError) {
		msg = error.message;
		if (error.isUnauthorized) {
			shouldLogout = true;
		}
	} else if (error instanceof Error && error.message) {
		msg = error.message;
	} else {
		msg = AppError.messages.UNEXPECTED;
	}
	return [msg, shouldLogout];
};

export function usePanic() {
	const { message } = App.useApp();
	const logout = useLogout();

	const panic = (error: unknown): boolean => {
		const [feedback, shouldLogout] = treatError(error);
		if (import.meta.env.DEV) {
			// eslint-disable-next-line no-console
			console.error("ERROR:", error);
		}
		message.error(feedback);
		if (shouldLogout) {
			logout();
		}
		return shouldLogout;
	};

	return panic;
}
