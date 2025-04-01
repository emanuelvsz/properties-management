import { Account } from "@core/domain/models/account";
import { Mapper } from "@core/domain/models/mapper";

/**
 * Propose the responsability to act as an Adapter for Authorization operations.
 */
interface AuthRepository {
	mapper: Mapper<Account>;

	login(username: string, password: string): Promise<boolean>;
	findProfile(): Promise<Account>;
	forgotPassword(email: string): Promise<boolean>;
	resetPassword(token: string, newPassword: string): Promise<boolean>;
	logout(): Promise<void>;
	saveAuthorization(_: string): void;
	clearAuthorization(): void;
}

export default AuthRepository;
