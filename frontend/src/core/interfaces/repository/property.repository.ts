import { Mapper } from "@core/domain/models/mapper";
import { Property } from "@core/domain/models/property";
import { PropertyFilters } from "@core/domain/types/filters/property-filters";


interface PropertyRepository {
	mapper: Mapper<Property>;

	list(filters?: PropertyFilters): Promise<Property[]>;	delete(id: string): Promise<void>;
	create(data: Property): Promise<void>;
}

export default PropertyRepository;
