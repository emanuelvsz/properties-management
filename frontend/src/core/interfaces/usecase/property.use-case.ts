import { Property } from "@core/domain/models/property";
import { RentContract } from "@core/domain/models/rent-contract";
import { PropertyFilters } from "@core/domain/types/filters/property-filters";

abstract class PropertyUseCase {
	abstract list(filters?: PropertyFilters): Promise<Property[]>;
	abstract delete(id: string): Promise<void>;
	abstract create(data: Property): Promise<void>;
	abstract update(data: Property): Promise<void>;
	abstract listByID(id: string): Promise<Property>
	abstract listContracts(id: string, archived: boolean): Promise<RentContract[]>
}

export default PropertyUseCase;
