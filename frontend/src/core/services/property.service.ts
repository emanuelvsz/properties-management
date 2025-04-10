import PropertyUseCase from "@core/interfaces/usecase/property.repository";
import { Property } from "@core/domain/models/property";
import PropertyRepository from "@core/interfaces/repository/property.repository";

class PropertyService implements PropertyUseCase {
	constructor(protected readonly adapter: PropertyRepository) {}

	async list(): Promise<Property[]> {
		return await this.adapter.list();;
	}
}

export default PropertyService;
