import { RentContract } from "@core/domain/models/rent-contract";
import { DefaultFilters } from "@core/domain/types/filters/default-filters";

abstract class RentContractUseCase {
	abstract list(filters?: DefaultFilters): Promise<RentContract[]>;
	abstract create(data: RentContract): Promise<void>;
	abstract update(data: RentContract): Promise<void>;
	abstract delete(id: string): Promise<void>;
}

export default RentContractUseCase;
