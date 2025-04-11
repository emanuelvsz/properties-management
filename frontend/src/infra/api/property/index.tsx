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

	async delete(id: string): Promise<void> {
		await BackendClient.delete<DTO[]>(`/properties/${id}`);
	}

	async create(data: Property): Promise<void> {
		await BackendClient.post<DTO>("/properties", data.toJSON());
	}
}

export default PropertyAPI;
