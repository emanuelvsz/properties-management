import { Expense } from "@core/domain/models/expense";
import { Mapper } from "@core/domain/models/mapper";
import { Property } from "@core/domain/models/property";
import { PropertyFilters } from "@core/domain/types/filters/property-filters";


interface PropertyRepository {
	mapper: Mapper<Property>;

	list(filters?: PropertyFilters): Promise<Property[]>;	
	delete(id: string): Promise<void>;
	create(data: Property): Promise<void>;
	listByID(id: string): Promise<Property>;
}

export default PropertyRepository;
