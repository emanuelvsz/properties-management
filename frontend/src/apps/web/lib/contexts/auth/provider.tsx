import { App } from "antd";

import { AxiosError } from "axios";

import {
	PropsWithChildren,
	useCallback,
	useMemo,
	useState,
	useEffect
} from "react";

import { useNavigate } from "react-router-dom";

import { Account as BaseAccount } from "@core/domain/models/account";
import AuthUseCase from "@core/interfaces/usecase/auth.use-case";
import AppError from "core/helper/error";

import { AuthCTX } from ".";
import { usePanic } from "./hooks";

interface AuthProviderProps {
	usecase: AuthUseCase;
}

const AuthProvider = <Account extends BaseAccount = BaseAccount>({
	children,
	usecase
}: PropsWithChildren<AuthProviderProps>): JSX.Element => {
	const [data, setData] = useState<Account | undefined>(
		usecase.getCachedAccount() as Account
	);
	const navigate = useNavigate();
	const panic = usePanic();
	const { message } = App.useApp();

	const login = useCallback(
		async (username: string, password: string) => {
			try {
				const account = await usecase.login(username, password);
				setData(account as Account);
				return true;
			} catch (error) {
				if (error instanceof AppError && (error as AppError).isUnauthorized) {
					message.error("Invalid user or password!");
					return false;
				}
				panic(error);
			}
			return false;
		},
		[message, panic, usecase]
	);

	const forgotPassword = useCallback(
		async (recoveryEmail: string) => {
			try {
				const isValidRecoveryEmail =
					await usecase.forgotPassword(recoveryEmail);
				if (isValidRecoveryEmail) {
					return true;
				}
			} catch (error) {
				panic(error);
			}
			return false;
		},
		[panic, usecase]
	);

	const resetPassword = useCallback(
		async (token: string, newPassword: string) => {
			try {
				const passwordHasBeenReset = await usecase.resetPassword(
					token,
					newPassword
				);
				if (passwordHasBeenReset) {
					navigate("/login");
					return true;
				}
			} catch (error) {
				if (error instanceof AxiosError) {
					if (error.response?.status === 401) {
						message.error("Token inválido!");
					} else {
						panic(error);
					}
				}
			}
			return false;
		},
		[message, navigate, panic, usecase]
	);

	const logout = useCallback(() => {
		usecase.logout();
		setData(undefined);
		navigate("/login");
	}, [navigate, usecase]);

	useEffect(() => {
		const refreshToken = localStorage.getItem("refresh_token");
		const refreshTokenExpiresAt = localStorage.getItem(
			"refresh_token_expires_at"
		);

		if (!refreshToken || !refreshTokenExpiresAt) {
			return;
		}

		const expiresAt = new Date(refreshTokenExpiresAt);
		if (expiresAt <= new Date()) {
			logout();
			return;
		}

		const refreshInterval = setInterval(
			async () => {
				try {
					const newTokens = await usecase.refreshToken(refreshToken);
					if (newTokens) {
						localStorage.setItem("refresh_token", newTokens.refresh_token);
						localStorage.setItem(
							"refresh_token_expires_at",
							newTokens.refresh_token_expires_at
						);
					}
				} catch (error) {
					logout();
				}
			},
			14 * 60 * 1000
		);

		return () => clearInterval(refreshInterval);
	}, [usecase, logout]);

	const values = useMemo(
		() => ({
			account: data,
			login,
			logout,
			forgotPassword,
			resetPassword
		}),
		[data, login, logout, forgotPassword, resetPassword]
	);

	return <AuthCTX.Provider value={values}>{children}</AuthCTX.Provider>;
};

export default AuthProvider;
