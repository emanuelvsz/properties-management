import { Property, PropertyMapper } from "@core/domain/models/property";
import PropertyRepository from "@core/interfaces/repository/property.repository";
import { BackendClient } from "../clients";
import { DTO } from "@core/domain/types";

class PropertyAPI implements PropertyRepository {
	mapper = new PropertyMapper();

	async list(): Promise<Property[]> {
		const response = await BackendClient.get<DTO[]>("/properties");
		const propertyDTOs = response.data;
		return propertyDTOs.map((dto) => this.mapper.deserialize(dto));
	}
}

export default PropertyAPI;
