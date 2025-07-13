import { Expense } from "@core/domain/models/expense";
import { Pagination } from "@core/domain/models/pagination";
import { Property } from "@core/domain/models/property";
import { RentContract } from "@core/domain/models/rent-contract";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";
import { PropertyFilters } from "@core/domain/types/filters/property-filters";
import { createContext } from "use-context-selector";

interface Props {
	list(filters?: PropertyFilters): Promise<Pagination<Property> | null>;
	deleteProperty(id: string): Promise<void>;
	create(data: Property): Promise<void>;
	update(data: Property): Promise<void>;
	listByID(id: string): Promise<Property | null>;
	listPropertyContracts(
		id: string,
		archived: boolean,
		page: number
	): Promise<Pagination<RentContract>>;
	listPropertyExpenses(
		id: string,
		page: number,
		filters?: ExpenseFilters
	): Promise<Pagination<Expense>>;
}

export const PropertyCTX = createContext({} as Props);
