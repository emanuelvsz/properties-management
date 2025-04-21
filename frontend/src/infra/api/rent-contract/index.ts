import RentContractRepository from "@core/interfaces/repository/rent-contract.repository";
import { BackendClient } from "../clients";
import { DTO } from "@core/domain/types";
import {
	RentContract,
	RentContractMapper
} from "@core/domain/models/rent-contract";
import { DefaultFilters } from "@core/domain/types/filters/default-filters";

class RentContractAPI implements RentContractRepository {
	mapper = new RentContractMapper();

	async list(filters?: DefaultFilters): Promise<RentContract[]> {
		const response = await BackendClient.get<DTO[]>(`/rent-contract`, {
			params: filters
		});
		const rentContractsDTOs = response.data;
		return rentContractsDTOs.map((dto) => this.mapper.deserialize(dto));
	}

	async delete(id: string): Promise<void> {
		await BackendClient.delete<DTO[]>(`/rent-contract/${id}`);
	}

	async create(data: RentContract): Promise<void> {
		await BackendClient.post<DTO>("/rent-contract", data.toJSON());
	}

    async update(data: RentContract): Promise<void> {
		await BackendClient.put<DTO>(`/rent-contract/${data.id}`, data.toJSON());
	}
}

export default RentContractAPI;
