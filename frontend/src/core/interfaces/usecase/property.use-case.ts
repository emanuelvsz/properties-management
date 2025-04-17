import { Property } from "@core/domain/models/property";
import { PropertyFilters } from "@core/domain/types/filters/property-filters";

abstract class PropertyUseCase {
	abstract list(filters?: PropertyFilters): Promise<Property[]>;
	abstract delete(id: string): Promise<void>;
	abstract create(data: Property): Promise<void>;
	abstract listByID(id: string): Promise<Property>
}

export default PropertyUseCase;
