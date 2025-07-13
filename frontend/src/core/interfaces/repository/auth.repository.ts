import { Account } from "@core/domain/models/account";
import { Mapper } from "@core/domain/models/mapper";

interface RefreshTokenResponse {
	access: string;
	refresh_token: string;
	refresh_token_expires_at: string;
}

interface AuthRepository {
	mapper: Mapper<Account>;

	login(username: string, password: string): Promise<boolean>;
	findProfile(): Promise<Account>;
	forgotPassword(email: string): Promise<boolean>;
	resetPassword(token: string, newPassword: string): Promise<boolean>;
	refreshToken(refreshToken: string): Promise<RefreshTokenResponse | null>;
	logout(): Promise<void>;
	saveAuthorization(_: string): void;
	clearAuthorization(): void;
}

export default AuthRepository;
