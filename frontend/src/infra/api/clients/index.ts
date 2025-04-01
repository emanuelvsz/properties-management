import axios, { AxiosError } from "axios";
import applyCaseMiddleware from "axios-case-converter";

import { DTO } from "@core/domain/types/index";

import AppError from "@core/helper/error";

export const BackendClient = applyCaseMiddleware(
	axios.create({
		baseURL: `${process.env.WEB_API_URL ?? "/"}/api`,
		headers: {
			"Content-Type": "application/json",
			namingSkakeCase: true
		},

		timeout: 1000
	}),
	{
		ignoreHeaders: true,
		ignoreParams: true
	}
);

BackendClient.interceptors.response.use(
	(response) => response,
	(error: AxiosError<DTO>) => {
		if (
			(error.code === "ECONNABORTED" && error.message.includes("timeout")) ||
			!error.response
		) {
			return Promise.reject(
				AppError.Unknown(AppError.messages.UNAVAILABLE_SERVICE)
			);
		}
		let formattedError;
		const message = String(error.response.data.message);
		switch (error.response.status) {
			case 400:
				if (
					message.includes("already exists") ||
					message.includes("already in use")
				) {
					formattedError = AppError.Unknown(message);
				}
				formattedError = AppError.Unknown;
				break;
			case 401:
				formattedError = AppError.Unauthorized;
				break;
			case 500:
			case 501:
			case 502:
			case 503:
				formattedError = AppError.Unknown(
					AppError.messages.UNAVAILABLE_SERVICE
				);
				break;
			default:
				formattedError = AppError.Unknown;
		}
		return Promise.reject(formattedError);
	}
);
