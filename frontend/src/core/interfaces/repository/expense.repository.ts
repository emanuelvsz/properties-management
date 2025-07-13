import { Expense } from "@core/domain/models/expense";
import { Mapper } from "@core/domain/models/mapper";
import { Pagination } from "@core/domain/models/pagination";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";

interface ExpenseRepository {
	mapper: Mapper<Expense>;

	list(filters?: ExpenseFilters): Promise<Pagination<Expense>>;
	create(data: Expense): Promise<void>;
	update(data: Expense, propertyId: string): Promise<void>;
	delete(id: string): Promise<void>;
	listExpenseTypes(): Promise<string[]>;
}

export default ExpenseRepository;
