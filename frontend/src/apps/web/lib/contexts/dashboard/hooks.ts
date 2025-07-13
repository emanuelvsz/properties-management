import { App } from "antd";
import { AxiosError } from "axios";
import { useContextSelector } from "use-context-selector";

import AppError from "core/helper/error";

import { useLogout } from "../auth/hooks";
import { DashboardCTX } from ".";

export function useListDashboardReturnSummary() {
	return useContextSelector(DashboardCTX, (ctx) => ctx.listReturnSummary);
}

const treatAxiosError = (error: AxiosError): [string, boolean] => {
	let msg: string | undefined;
	let shouldLogout: boolean = false;
	switch (error.response?.status) {
		case 401:
			shouldLogout = true;
			msg = "A sua sessão expirou. Por favor, realize login novamente.";
			break;
		case 403:
			shouldLogout = true;
			msg =
				"Oops! Alguma funcionalidade que você não tem permissão foi ativada. Por favor, realize login novamente.";
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
