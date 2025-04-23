import { Property, PropertyMapper } from "@core/domain/models/property";
import PropertyRepository from "@core/interfaces/repository/property.repository";
import { BackendClient } from "../clients";
import { DTO } from "@core/domain/types";
import { PropertyFilters } from "@core/domain/types/filters/property-filters";
import {
	RentContract,
	RentContractMapper
} from "@core/domain/models/rent-contract";
import { Pagination } from "@core/domain/models/pagination";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";
import { Expense, ExpenseMapper } from "@core/domain/models/expense";

class PropertyAPI implements PropertyRepository {
	mapper = new PropertyMapper();
	contractMapper = new RentContractMapper();
	expenseMapper = new ExpenseMapper();

	async list(filters?: PropertyFilters): Promise<Pagination<Property>> {
		const response = await BackendClient.get("/properties", {
			params: { ...filters }
		});
		console.log("Response data", response.data);
		const { data, page, pageSize, count, total } = response.data;
		const properties = data.map((dto: DTO) => this.mapper.deserialize(dto));
		return new Pagination<Property>(page, pageSize, count, total, properties);
	}

	async listByID(id: string): Promise<Property> {
		const response = await BackendClient.get<DTO>(`/properties/${id}`);
		return this.mapper.deserialize(response.data);
	}

	async delete(id: string): Promise<void> {
		await BackendClient.delete<DTO[]>(`/properties/${id}`);
	}

	async create(data: Property): Promise<void> {
		await BackendClient.post<DTO>("/properties", data.toJSON());
	}

	async update(data: Property): Promise<void> {
		await BackendClient.put<DTO>(`/properties/${data.id}`, data.toJSON());
	}

	async listPropertyContracts(
		id: string,
		archived: boolean,
		page: number
	): Promise<Pagination<RentContract>> {
		const response = await BackendClient.get(
			`/properties/${id}/contracts?archived=${archived}&page=${page}`
		);
		const { data, pageData, pageSize, count, total } = response.data;
		const contracts = data.map((dto: DTO) =>
			this.contractMapper.deserialize(dto)
		);
		return new Pagination<RentContract>(
			pageData,
			pageSize,
			count,
			total,
			contracts
		);
	}

	async listPropertyExpenses(
		id: string,
		page: number,
		filters?: ExpenseFilters
	): Promise<Pagination<Expense>> {
		const response = await BackendClient.get(`/properties/${id}/expenses`, {
			params: { ...filters, page: page }
		});
		const { data, pageData, pageSize, count, total } = response.data;
		const expenses = data.map((dto: DTO) =>
			this.expenseMapper.deserialize(dto)
		);
		return new Pagination<Expense>(pageData, pageSize, count, total, expenses);
	}
}

export default PropertyAPI;
