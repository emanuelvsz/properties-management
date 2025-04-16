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
	#status: string;
	#location: string;
	#code: string

	constructor(
		id: string,
		title: string | undefined,
		bedrooms: number,
		bathrooms: number,
		surface: number,
		rent: number,
		furnished: boolean,
		status: string,
		location: string,
		code: string,
		description?: string,
	) {
		super();
		this.#id = id;
		this.#title = title;
		this.#bedrooms = bedrooms;
		this.#bathrooms = bathrooms;
		this.#surface = surface;
		this.#rent = rent;
		this.#furnished = furnished;
		this.#status = status;
		this.#location = location;
		this.#description = description;
		this.#code = code
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
			formData.status,
			formData.location,
			formData.code,
			formData.description,
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
			description: this.#description,
			status: this.#status,
			location: this.#location
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

	get status(){
		return this.#status
	}

	get location () {
		return this.#location
	}

	get code () {
		return this.#code
	}

	get formattedCode () {
		return "#" + this.#code
	}
}

export { Property };
