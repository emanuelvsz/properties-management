import PropertyUseCase from "@core/interfaces/usecase/property.use-case";
import { Property } from "@core/domain/models/property";
import PropertyRepository from "@core/interfaces/repository/property.repository";
import { PropertyFilters } from "@core/domain/types/filters/property-filters";
import { RentContract } from "@core/domain/models/rent-contract";
import { Pagination } from "@core/domain/models/pagination";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";
import { Expense } from "@core/domain/models/expense";

class PropertyService implements PropertyUseCase {
	constructor(protected readonly adapter: PropertyRepository) {}

	async list(filters?: PropertyFilters): Promise<Pagination<Property>> {
		return await this.adapter.list(filters);;
	}

	async delete(id: string): Promise<void> {
		return await this.adapter.delete(id);
	}

	async create(data: Property): Promise<void> {
		return await this.adapter.create(data);
	}

	async update(data: Property): Promise<void> {
		return await this.adapter.update(data);
	}

	async listByID(id: string): Promise<Property> {
		return await this.adapter.listByID(id);
	}

	async listPropertyContracts(id: string, archived: boolean, page: number): Promise<Pagination<RentContract>> {
		return await this.adapter.listPropertyContracts(id, archived, page);
	}

	async listPropertyExpenses(id: string, page: number, filters?: ExpenseFilters): Promise<Pagination<Expense>> {
		return await this.adapter.listPropertyExpenses(id, page, filters);
	}
}

export default PropertyService;
