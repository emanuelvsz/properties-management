import { Model } from "../model";

export const ADMIN_ROLE_TYPE = "admin" as const;
export const UNAUTH_ROLE_TYPE = "unauth" as const;

class AccountRole extends Model {
	#id: string;
	#name: string;
	#code: string;

	constructor(id: string, name: string, code: string) {
		super();
		this.#id = id;
		this.#name = name;
		this.#code = code;
	}

	get id() {
		return this.#id;
	}

	get name() {
		return this.#name;
	}

	get code() {
		return this.#code;
	}
}

export { AccountRole };
