import { Model } from "../model";

class InventoryCategory extends Model {
	#id: string;
	#name: string;
	#description?: string;

	constructor(id: string, name: string, description?: string) {
		super();
		this.#id = id;
		this.#name = name;
		this.#description = description;
	}

	static fromForm(formData: any): InventoryCategory {
		return new InventoryCategory(
			formData.id,
			formData.name,
			formData.description
		);
	}

	public toJSON() {
		return {
			id: this.#id,
			name: this.#name,
			description: this.#description
		};
	}

	get id() {
		return this.#id;
	}

	get name() {
		return this.#name;
	}

	get description() {
		return this.#description ?? "";
	}
}

export { InventoryCategory };
