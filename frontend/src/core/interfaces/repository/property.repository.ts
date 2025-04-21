import { Mapper } from "@core/domain/models/mapper";
import { Property } from "@core/domain/models/property";
import { RentContract } from "@core/domain/models/rent-contract";
import { PropertyFilters } from "@core/domain/types/filters/property-filters";


interface PropertyRepository {
	mapper: Mapper<Property>;
	contractMapper: Mapper<RentContract>

	list(filters?: PropertyFilters): Promise<Property[]>;	
	delete(id: string): Promise<void>;
	create(data: Property): Promise<void>;
	update(data: Property): Promise<void>;
	listByID(id: string): Promise<Property>;
	listContracts(id: string, archived: boolean): Promise<RentContract[]>
}

export default PropertyRepository;
