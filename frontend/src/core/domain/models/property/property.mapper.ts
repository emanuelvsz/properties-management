import { Property } from "./property";
import { DTO } from "../../types";
import { Mapper } from "../mapper";

class PropertyMapper extends Mapper<Property> {
	deserialize(data: DTO): Property {
		const id = String(data.id);
		const title = data.title ? String(data.title) : undefined;
		const bedrooms = Number(data.bedrooms);
		const bathrooms = Number(data.bathrooms);
		const surface = Number(data.surface);
		const rent = Number(data.rent);
		const furnished = Boolean(data.furnished);
		const description = data.description ? String(data.description) : undefined;
		const status = String(data.status);

		return new Property(
			id,
			title,
			bedrooms,
			bathrooms,
			surface,
			rent,
			furnished,
			status,
			description
		);
	}

	serialize(data: Property): DTO {
		return {
			id: data.id,
			title: data.title,
			bedrooms: data.bedrooms,
			bathrooms: data.bathrooms,
			surface: data.surface,
			rent: data.rent,
			furnished: data.furnished,
			description: data.description,
			status: data.status
		};
	}
}


export { PropertyMapper };
