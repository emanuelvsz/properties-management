import { RentContract } from "@core/domain/models/rent-contract";
import { DefaultFilters } from "@core/domain/types/filters/default-filters";
import RentContractRepository from "@core/interfaces/repository/rent-contract.repository";
import RentContractUseCase from "@core/interfaces/usecase/rent-contract.use-case";

class RentContractService implements RentContractUseCase {
	constructor(protected readonly adapter: RentContractRepository) {}

	async list(filters?: DefaultFilters): Promise<RentContract[]> {
		return await this.adapter.list(filters);
	}

	async delete(id: string): Promise<void> {
		return await this.adapter.delete(id);
	}

	async create(data: RentContract): Promise<void> {
		return await this.adapter.create(data);
	}

	async update(data: RentContract): Promise<void> {
		return await this.adapter.update(data);
	}
}

export default RentContractService;
