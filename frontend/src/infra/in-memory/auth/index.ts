import { Account, AccountMapper } from "@core/domain/models/account";

import AuthRepository from "@core/interfaces/repository/auth.repository";

import { createMockedAccount } from "./data";

class AuthInMemory implements AuthRepository {
	mapper = new AccountMapper();

	login(_username: string, _password: string): Promise<boolean> {
		console.log("Reidocurme")
		return Promise.resolve(true);
	}
	findProfile(): Promise<Account> {
		return Promise.resolve(this.mapper.deserialize(createMockedAccount()));
	}
	logout(): Promise<void> {
		return Promise.resolve();
	}
	forgotPassword(_email: string): Promise<boolean> {
		return Promise.resolve(true);
	}
	resetPassword(_token: string, _newPassword: string): Promise<boolean> {
		return Promise.resolve(true);
	}
	saveAuthorization(_token: string): void {}
	clearAuthorization(): void {}
}

export default AuthInMemory;
