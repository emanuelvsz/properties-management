export type StorageKeys = "account" | "token" | "refresh" | "language";

const ACCOUNT_RELATED_KEYS: StorageKeys[] = ["account", "token", "refresh"];

class StorageController {
	private static readonly keys: Record<StorageKeys, string> = {
		account: "P.MG@USER_DATA",
		token: "P.MG@AUTH_TOKEN",
		refresh: "P.MG@REFRESH_TOKEN",
		language: "P.MG@LANGUAGE"
	};

	static set(
		key: StorageKeys,
		data: unknown,
		persistAfterSession: boolean = true
	): void {
		const storage = persistAfterSession ? localStorage : sessionStorage;
		storage?.setItem(StorageController.keys[key], String(data));
	}

	static setJSON(
		key: StorageKeys,
		data: unknown,
		persistAfterSession: boolean = true
	): void {
		const strData = JSON.stringify(data);
		const storage = persistAfterSession ? localStorage : sessionStorage;
		storage?.setItem(StorageController.keys[key], strData);
	}

	static get<T = unknown>(
		key: StorageKeys,
		persistAfterSession: boolean = true
	): undefined | T {
		const storage = persistAfterSession ? localStorage : sessionStorage;
		const data: string | null | T = storage?.getItem(
			StorageController.keys[key]
		);
		if (!data || data === null) {
			return undefined;
		}
		return data as T;
	}

	static getJSON<T = unknown>(
		key: StorageKeys,
		persistAfterSession: boolean = true
	): undefined | T {
		const storage = persistAfterSession ? localStorage : sessionStorage;
		let data: string | null | T = storage?.getItem(StorageController.keys[key]);
		if (!data || data === null) {
			return undefined;
		}
		data = JSON.parse(data) as T;
		return data;
	}

	static removeAccount(): void {
		ACCOUNT_RELATED_KEYS.forEach((key) => {
			localStorage.removeItem(StorageController.keys[key]);
			sessionStorage.removeItem(StorageController.keys[key]);
		});
	}

	static clear(): void {
		localStorage.clear();
		sessionStorage.clear();
	}
}

export default StorageController;
