import { Mapper } from "@core/domain/models/mapper";
import { RentContract } from "@core/domain/models/rent-contract";
import { DefaultFilters } from "@core/domain/types/filters/default-filters";


interface RentContractRepository {
	mapper: Mapper<RentContract>;

	list(filters?: DefaultFilters): Promise<RentContract[]>;
	create(data: RentContract): Promise<void>;
	update(data: RentContract): Promise<void>;
	delete(id: string): Promise<void>;
}

export default RentContractRepository;
