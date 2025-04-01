import { Model } from "../model";

class Person extends Model {
	#id!: string;
	#birthDate!: string;
	#cpf!: string;
	#email!: string;
	#name!: string;
	#phone!: string;

	constructor(
		id: string,
		birthDate: string,
		cpf: string,
		email: string,
		name: string,
		phone: string
	) {
		super();
		this.#id = id;
		this.#birthDate = birthDate;
		this.#cpf = cpf;
		this.#email = email;
		this.#name = name;
		this.#phone = phone;
	}

	get id() {
		return this.#id;
	}

	get birthDate() {
		return this.#birthDate;
	}

	get cpf() {
		return this.#cpf;
	}

	get email() {
		return this.#email;
	}

	get name() {
		return this.#name;
	}

	get phone() {
		return this.#phone;
	}
}

export { Person };
