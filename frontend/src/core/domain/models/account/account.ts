import {
	ADMIN_ROLE_TYPE,
	AccountRole,
	UNAUTH_ROLE_TYPE
} from "../account-role/account-role";
import { Model } from "../model";

class Account extends Model {
	#id: string;
	#name: string;
	#email: string;
	#roles: AccountRole[];
	#createdAt: string;

	constructor(
		id: string,
		name: string,
		email: string,
		roles: AccountRole[],
		createdAt: string
	) {
		super();
		this.#id = id;
		this.#name = name;
		this.#email = email;
		this.#roles = roles;
		this.#createdAt = createdAt;
	}

	get id() {
		return this.#id;
	}

	get name() {
		return this.#name;
	}

	get email() {
		return this.#email;
	}

	get roles() {
		return this.#roles;
	}

	get createdAt() {
		return this.#createdAt;
	}

	get roleKey() {
		const role = this.#roles[0];
		switch (role?.code?.toUpperCase()) {
			case "ADMIN":
				return ADMIN_ROLE_TYPE;
			default:
				return UNAUTH_ROLE_TYPE;
		}
	}

	get formattedName() {
		if (!this.name) {
			return "";
		}
		const splittedName = this.name.split(" ");
		if (splittedName.length === 1) {
			return splittedName[0];
		}
		return `${splittedName[0]} ${splittedName[1]}`;
	}

	get firstName() {
		return this.name?.split(" ")[0] ?? "Not Informed.";
	}

	get isAdmin() {
		return this.roles.some(
			(role) => role.code.toUpperCase() === ADMIN_ROLE_TYPE
		);
	}
}

export { Account };
