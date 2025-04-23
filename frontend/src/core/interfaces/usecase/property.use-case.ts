import { Expense } from "@core/domain/models/expense";
import { Pagination } from "@core/domain/models/pagination";
import { Property } from "@core/domain/models/property";
import { RentContract } from "@core/domain/models/rent-contract";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";
import { PropertyFilters } from "@core/domain/types/filters/property-filters";

abstract class PropertyUseCase {
	abstract list(filters?: PropertyFilters): Promise<Pagination<Property>>;
	abstract delete(id: string): Promise<void>;
	abstract create(data: Property): Promise<void>;
	abstract update(data: Property): Promise<void>;
	abstract listByID(id: string): Promise<Property>
	abstract listPropertyContracts(id: string, archived: boolean, page: number): Promise<Pagination<RentContract>>
	abstract listPropertyExpenses(id: string, page: number, filters?: ExpenseFilters): Promise<Pagination<Expense>>;
}

export default PropertyUseCase;
