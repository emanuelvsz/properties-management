import { Account } from "@core/domain/models/account";

/**
 * Propose the responsability to execute business logic operations for authorization behaviors between the UI and the adapter layer.
 */
abstract class AuthUseCase {
	abstract login(username: string, password: string): Promise<Account>;
	abstract logout(): Promise<void>;
	abstract forgotPassword(recoveryEmail: string): Promise<boolean>;
	abstract resetPassword(token: string, newPassword: string): Promise<boolean>;
	abstract getCachedAccount(): Account | null;
	abstract clearCachedAccount(): void;
}

export default AuthUseCase;
