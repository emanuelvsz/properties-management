import { createContext } from "use-context-selector";

import { Account } from "@core/domain/models/account";

interface Props {
	account: undefined | Account;
	login(username: string, password: string): Promise<boolean>;
	forgotPassword(recoveryEmail: string): Promise<boolean>;
	resetPassword(token: string, newPassword: string): Promise<boolean>;
	logout(): void;
}

export const AuthCTX = createContext({} as Props);
