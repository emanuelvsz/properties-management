import { Mapper } from "@core/domain/models/mapper";
import { Property } from "@core/domain/models/property";


interface PropertyRepository {
	mapper: Mapper<Property>;

	list(): Promise<Property[]>;
	delete(id: string): Promise<void>;
	create(data: Property): Promise<void>;
}

export default PropertyRepository;
