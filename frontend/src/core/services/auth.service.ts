import { Account, AccountMapper } from "@core/domain/models/account";
import { DTO } from "@core/domain/types/index";

import StorageController from "core/helper/storage/storage-controller";

import AuthRepository from "../interfaces/repository/auth.repository";
import AuthUseCase from "../interfaces/usecase/auth.use-case";

class AuthService implements AuthUseCase {
	constructor(protected readonly adapter: AuthRepository) {
		const token = StorageController.get<string>("token");
		if (token) {
			this.adapter.saveAuthorization(token);
		}
	}

	async login(username: string, password: string): Promise<Account> {
		await this.adapter.login(username, password);
		const account = await this.adapter.findProfile().catch((error) => {
			this.adapter.clearAuthorization();
			throw error;
		});
		return account;
	}

	forgotPassword(recoveryEmail: string): Promise<boolean> {
		return this.adapter.forgotPassword(recoveryEmail);
	}

	resetPassword(token: string, newPassword: string): Promise<boolean> {
		return this.adapter.resetPassword(token, newPassword);
	}

	logout(): Promise<void> {
		StorageController.clear();
		return this.adapter.logout();
	}

	getCachedAccount() {
		const serializedAccount = StorageController.getJSON<DTO>("account");
		if (!serializedAccount) {
			return null;
		}
		return new AccountMapper().deserialize(serializedAccount);
	}

	clearCachedAccount(): void {
		this.adapter.clearAuthorization();
		StorageController.clear();
	}
}

export default AuthService;
