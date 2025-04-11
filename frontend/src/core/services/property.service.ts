import PropertyUseCase from "@core/interfaces/usecase/property.repository";
import { Property } from "@core/domain/models/property";
import PropertyRepository from "@core/interfaces/repository/property.repository";

class PropertyService implements PropertyUseCase {
	constructor(protected readonly adapter: PropertyRepository) {}

	async list(): Promise<Property[]> {
		return await this.adapter.list();;
	}

	async delete(id: string): Promise<void> {
		return await this.adapter.delete(id);
	}

	async create(data: Property): Promise<void> {
		return await this.adapter.create(data)
	}
}

export default PropertyService;
