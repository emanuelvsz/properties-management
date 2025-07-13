import { Account, AccountMapper } from "@core/domain/models/account";
import { DTO } from "@core/domain/types/index";
import StorageController from "@core/helper/storage/storage-controller";
import AuthRepository from "@core/interfaces/repository/auth.repository";

import { BackendClient } from "../clients";


class AuthAPI implements AuthRepository {
	mapper = new AccountMapper();

	async login(username: string, password: string): Promise<boolean> {
		const response = await BackendClient.post<{
			access: string;
			refresh: string;
			refresh_token: string;
			refresh_token_expires_at: string;
		}>("/auth/login", {
			username,
			password
		});
		const { access, refresh, refresh_token, refresh_token_expires_at } =
			response.data;
		StorageController.set("token", access);
		StorageController.set("refresh", refresh);
		localStorage.setItem("refresh_token", refresh_token);
		localStorage.setItem("refresh_token_expires_at", refresh_token_expires_at);
		this.saveAuthorization(access);
		return true;
	}

	async logout(): Promise<void> {
		try {
			const token = StorageController.get("token") as string;
			const refreshToken = StorageController.get("refresh") as string;

			if (token && typeof token === "string") {
				this.saveAuthorization(token);
			}

			if (refreshToken && typeof refreshToken === "string") {
				await BackendClient.post("/auth/logout", {
					refresh: refreshToken
				});
			}
		} catch (error) {
		} finally {
			StorageController.clear();
			this.clearAuthorization();
		}
	}

	async findProfile(): Promise<Account> {
		const response = await BackendClient.get<DTO>("/profile");
		const profileDTO = response.data;
		StorageController.setJSON("account", profileDTO);
		return this.mapper.deserialize(profileDTO);
	}

	async refreshToken(
		refreshToken: string
	): Promise<{
		access: string;
		refresh_token: string;
		refresh_token_expires_at: string;
	} | null> {
		try {
			const response = await BackendClient.post<{
				access: string;
				refresh_token: string;
				refresh_token_expires_at: string;
			}>("/auth/refresh-token", {
				refresh_token: refreshToken
			});

			const { access, refresh_token, refresh_token_expires_at } = response.data;
			StorageController.set("token", access);
			localStorage.setItem("refresh_token", refresh_token);
			localStorage.setItem(
				"refresh_token_expires_at",
				refresh_token_expires_at
			);
			this.saveAuthorization(access);

			return {
				access,
				refresh_token,
				refresh_token_expires_at
			};
		} catch (error) {
			return null;
		}
	}

	forgotPassword(_email: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	resetPassword(_token: string, __newPassword: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	saveAuthorization(token: string): void {
		BackendClient.defaults.headers.common.Authorization = `Bearer ${token}`;
	}

	clearAuthorization(): void {
		delete BackendClient.defaults.headers.common.Authorization;
	}
}

export default AuthAPI;
