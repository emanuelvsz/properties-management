import PropertyUseCase from "@core/interfaces/usecase/property.use-case";
import { Property } from "@core/domain/models/property";
import PropertyRepository from "@core/interfaces/repository/property.repository";
import { PropertyFilters } from "@core/domain/types/filters/property-filters";
import { RentContract } from "@core/domain/models/rent-contract";

class PropertyService implements PropertyUseCase {
	constructor(protected readonly adapter: PropertyRepository) {}

	async list(filters?: PropertyFilters): Promise<Property[]> {
		return await this.adapter.list(filters);;
	}

	async delete(id: string): Promise<void> {
		return await this.adapter.delete(id);
	}

	async create(data: Property): Promise<void> {
		return await this.adapter.create(data);
	}

	async update(data: Property): Promise<void> {
		return await this.adapter.update(data);
	}

	async listByID(id: string): Promise<Property> {
		return await this.adapter.listByID(id);
	}

	async listContracts(id: string, archived: boolean): Promise<RentContract[]> {
		return await this.adapter.listContracts(id, archived);
	}
}

export default PropertyService;
