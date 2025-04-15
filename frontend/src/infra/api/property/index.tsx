import { Property, PropertyMapper } from "@core/domain/models/property";
import PropertyRepository from "@core/interfaces/repository/property.repository";
import { BackendClient } from "../clients";
import { DTO } from "@core/domain/types";
import { PropertyFilters } from "@core/domain/types/filters/property-filters";

class PropertyAPI implements PropertyRepository {
	mapper = new PropertyMapper();

	async list(filters?: PropertyFilters): Promise<Property[]> {
		const response = await BackendClient.get<DTO[]>("/properties", {
			params: filters
		});
		const propertyDTOs = response.data;
		return propertyDTOs.map((dto) => this.mapper.deserialize(dto));
	}

	async listByID(id: string): Promise<Property> {
		const response = await BackendClient.get<DTO>(`/properties/${id}`);
		return this.mapper.deserialize(response.data);
	}

	async delete(id: string): Promise<void> {
		await BackendClient.delete<DTO[]>(`/properties/${id}`);
	}

	async create(data: Property): Promise<void> {
		await BackendClient.post<DTO>("/properties", data.toJSON());
	}

	async listExpenses(
		id: string,
		dateBy: string
	): Promise<Record<string, unknown>[]> {
		const response = await BackendClient.get<DTO[]>(
			`/properties/${id}/expenses`,
			{
				params: { date_by: dateBy }
			}
		);
		return response.data;
	}
}

export default PropertyAPI;
