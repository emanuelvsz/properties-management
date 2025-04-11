import { Model } from "../model";

class Property extends Model {
	#id: string;
	#title?: string;
	#bedrooms: number;
	#bathrooms: number;
	#surface: number;
	#rent: number;
	#furnished: boolean;
	#description?: string;

	constructor(
		id: string,
		title: string | undefined,
		bedrooms: number,
		bathrooms: number,
		surface: number,
		rent: number,
		furnished: boolean,
		description?: string
	) {
		super();
		this.#id = id;
		this.#title = title;
		this.#bedrooms = bedrooms;
		this.#bathrooms = bathrooms;
		this.#surface = surface;
		this.#rent = rent;
		this.#furnished = furnished;
		this.#description = description;
	}

	static fromForm(formData: any): Property {
		const id = ""
		return new Property(
			id,
			formData.title,
			formData.bedrooms,
			formData.bathrooms,
			formData.surface,
			formData.rent,
			formData.furnished ?? false,
			formData.description
		);
	}

	public toJSON() {
		return {
			id: this.#id,
			title: this.#title,
			bedrooms: this.#bedrooms,
			bathrooms: this.#bathrooms,
			surface: this.#surface,
			rent: this.#rent,
			furnished: this.#furnished,
			description: this.#description
		};
	}

	get id() {
		return this.#id;
	}

	get title() {
		return this.#title ?? "Untitled";
	}

	get bedrooms() {
		return this.#bedrooms;
	}

	get bathrooms() {
		return this.#bathrooms;
	}

	get surface() {
		return this.#surface;
	}

	get rent() {
		return this.#rent;
	}

	get furnished() {
		return this.#furnished;
	}

	get description() {
		return this.#description ?? "No description provided.";
	}

	get formattedRent() {
		return `$${this.#rent.toFixed(2)}`;
	}

	get summary() {
		return `${this.bedrooms} BR • ${this.bathrooms} BA • ${this.surface} m² • ${this.furnished ? "Furnished" : "Unfurnished"}`;
	}
}

export { Property };
