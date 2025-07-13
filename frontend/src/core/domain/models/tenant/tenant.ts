import { Model } from "../model";

class Tenant extends Model {
	#id: string;
	#name: string;
	#birthDate: string;
	#email: string;
	#phone: string;
	#status: string;

	constructor(
		id: string,
		name: string,
		birthDate: string,
		email: string,
		phone: string,
		status: string = "inactive"
	) {
		super();
		this.#id = id;
		this.#name = name;
		this.#birthDate = birthDate;
		this.#email = email;
		this.#phone = phone;
		this.#status = status;
	}

	static fromForm(formData: any): Tenant {
		return new Tenant(
			formData.id,
			formData.name,
			formData.birthDate,
			formData.email,
			formData.phone,
			formData.status
		);
	}

	public toJSON() {
		return {
			id: this.#id,
			name: this.#name,
			birthDate: this.#birthDate,
			email: this.#email,
			phone: this.#phone,
			status: this.#status
		};
	}

	get id() {
		return this.#id;
	}

	get name() {
		return this.#name;
	}

	get birthDate() {
		return this.#birthDate;
	}

	get email() {
		return this.#email;
	}

	get phone() {
		return this.#phone;
	}

	get status() {
		return this.#status;
	}
}

export { Tenant };
