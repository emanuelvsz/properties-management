type StorageKeys = "account" | "token";

class StorageController {
	private static readonly keys: Record<StorageKeys, string> = {
		account: "<PROJECT_NAME>@USER_DATA",
		token: "<PROJECT_NAME>@AUTH_TOKEN"
	};

	static set(
		key: StorageKeys,
		data: string,
		persistAfterSession: boolean = true
	): void {
		const storage = persistAfterSession ? localStorage : sessionStorage;
		storage?.setItem(StorageController.keys[key], data);
	}

	static setJSON<T = unknown>(
		key: StorageKeys,
		data: T,
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

	static clear(): void {
		localStorage.clear();
		sessionStorage.clear();
	}
}

export default StorageController;
