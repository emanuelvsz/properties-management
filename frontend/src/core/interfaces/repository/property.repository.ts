import { Expense } from "@core/domain/models/expense";
import { Mapper } from "@core/domain/models/mapper";
import { Pagination } from "@core/domain/models/pagination";
import { Property } from "@core/domain/models/property";
import { RentContract } from "@core/domain/models/rent-contract";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";
import { PropertyFilters } from "@core/domain/types/filters/property-filters";


interface PropertyRepository {
	mapper: Mapper<Property>;
	contractMapper: Mapper<RentContract>

	list(filters?: PropertyFilters): Promise<Pagination<Property>>;	
	delete(id: string): Promise<void>;
	create(data: Property): Promise<void>;
	update(data: Property): Promise<void>;
	listByID(id: string): Promise<Property>;
	listPropertyContracts(id: string, archived: boolean, page: number): Promise<Pagination<RentContract>>;
	listPropertyExpenses(id: string, page: number, filters?: ExpenseFilters): Promise<Pagination<Expense>>;
}

export default PropertyRepository;
