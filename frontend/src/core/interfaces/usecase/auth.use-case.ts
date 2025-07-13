import { Account } from "@core/domain/models/account";

interface RefreshTokenResponse {
	access: string;
	refresh_token: string;
	refresh_token_expires_at: string;
}

abstract class AuthUseCase {
	abstract login(username: string, password: string): Promise<Account>;
	abstract logout(): Promise<void>;
	abstract forgotPassword(recoveryEmail: string): Promise<boolean>;
	abstract resetPassword(token: string, newPassword: string): Promise<boolean>;
	abstract refreshToken(
		refreshToken: string
	): Promise<RefreshTokenResponse | null>;
	abstract getCachedAccount(): Account | null;
	abstract clearCachedAccount(): void;
}

export default AuthUseCase;
