import axios, { AxiosError } from "axios";
import applyCaseMiddleware from "axios-case-converter";

import { camelCase } from "lodash";

import { DTO } from "@core/domain/types";
import AppError from "@core/helper/error";
import StorageController from "@core/helper/storage/storage-controller";

let isRedirecting = false;

export const BackendClient = applyCaseMiddleware(
	axios.create({
		baseURL: "/api/",
		headers: {
			"Content-Type": "application/json"
		},
		timeout: 86_400_000
	})
);

const REFRESH_TOKEN_ENDPOINT = "/auth/refresh";
const UNAUTH_HTTP_CODES = [401, 403];

const deeplyApplyKeyTransform = (obj: Record<string, any>) => {
	const ret: Record<string, any> = Array.isArray(obj) ? [] : {};
	Object.keys(obj).forEach((key) => {
		if (obj[key] !== null && typeof obj[key] === "object") {
			ret[camelCase(key)] = deeplyApplyKeyTransform(obj[key]);
		} else {
			ret[camelCase(key)] = obj[key];
		}
	});
	return ret;
};

const tryRefreshStrategy = async (error: AxiosError) => {
	if (!error.response) {
		return AppError.Unauthorized("Your session expired. Please log in");
	}
	const { status } = error.response;
	if (
		!UNAUTH_HTTP_CODES.includes(status) ||
		error.response.config.url?.includes(REFRESH_TOKEN_ENDPOINT) ||
		error.response.config.url?.includes("/auth/refresh-token")
	) {
		return AppError.Unauthorized("Your session expired. Please log in");
	}

	const customRefreshToken = localStorage.getItem("refresh_token");
	if (customRefreshToken) {
		delete BackendClient.defaults.headers.common.Authorization;
		try {
			const response = await BackendClient.post<DTO>("/auth/refresh-token", {
				refresh_token: customRefreshToken
			});
			const { access, refresh_token, refresh_token_expires_at } = response.data;
			StorageController.set("token", access as string);
			localStorage.setItem("refresh_token", refresh_token as string);
			localStorage.setItem(
				"refresh_token_expires_at",
				refresh_token_expires_at as string
			);
			const authHeader = `Bearer ${access}`;
			error.response.config.headers.Authorization = authHeader;
			BackendClient.defaults.headers.common.Authorization = authHeader;
			return await axios(error.response.config);
		} catch {
			// If custom refresh fails, try JWT refresh
		}
	}

	// Fallback to JWT refresh token
	const oldRefreshToken = StorageController.get<string>("refresh");
	if (!oldRefreshToken) {
		return AppError.Unauthorized("Your session expired. Please log in");
	}
	delete BackendClient.defaults.headers.common.Authorization;
	try {
		const response = await BackendClient.post<DTO>(REFRESH_TOKEN_ENDPOINT, {
			refresh: oldRefreshToken
		});
		const { accessToken, refreshToken } = response.data;
		StorageController.set("token", accessToken);
		StorageController.set("refresh", refreshToken);
		const authHeader = `Bearer ${response.data.accessToken}`;
		error.response.config.headers.Authorization = authHeader;
		BackendClient.defaults.headers.common.Authorization = authHeader;
		return await axios(error.response.config);
	} catch {
		// If all refresh attempts fail, redirect to login
		if (!isRedirecting) {
			isRedirecting = true;
			// Clear all auth data
			StorageController.clear();
			localStorage.removeItem("refresh_token");
			localStorage.removeItem("refresh_token_expires_at");
			// Redirect to login
			window.location.href = "/login";
		}
		return AppError.Unauthorized("Your session expired. Please log in");
	}
};

BackendClient.interceptors.response.use(
	(response) => {
		response.data = deeplyApplyKeyTransform(response.data);
		return response;
	},
	async (error: AxiosError<DTO>) => {
		if (
			(error.code === "ECONNABORTED" && error.message.includes("timeout")) ||
			error.code === "ERR_NETWORK" ||
			!error.response
		) {
			return AppError.Unknown();
		}
		let formattedError;
		switch (error.response.status) {
			case 400: {
				const errorResponseData = error.response.data as Record<
					string,
					unknown
				>;
				if (!errorResponseData.error) {
					formattedError = AppError.Unknown();
				}
				break;
			}
			case 401:
				formattedError = await tryRefreshStrategy(error);
				break;
			case 403:
				formattedError = await tryRefreshStrategy(error);
				break;
			default:
				formattedError = AppError.Unknown();
				break;
		}
		throw formattedError;
	}
);
