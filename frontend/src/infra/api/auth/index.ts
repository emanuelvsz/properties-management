import { Account, AccountMapper } from "@core/domain/models/account";
import { DTO } from "@core/domain/types/index";
import StorageController from "@core/helper/storage/storage-controller";
import AuthRepository from "@core/interfaces/repository/auth.repository";

import { BackendClient } from "../clients";

interface AuthResponse {
	access: string;
}

class AuthAPI implements AuthRepository {
	mapper = new AccountMapper();

	async login(username: string, password: string): Promise<boolean> {
		const response = await BackendClient.post<AuthResponse>("/auth/login", {
			username,
			password
		});
		const token = response.data.access;
		StorageController.set("token", token);
		this.saveAuthorization(token);
		return true;
	}

	async logout(): Promise<void> {
		await BackendClient.post("/auth/logout");
		this.clearAuthorization();
	}

	async findProfile(): Promise<Account> {
		const response = await BackendClient.get<DTO>("/profile");
		const profileDTO = response.data;
		StorageController.setJSON("account", profileDTO);
		return this.mapper.deserialize(profileDTO);
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
