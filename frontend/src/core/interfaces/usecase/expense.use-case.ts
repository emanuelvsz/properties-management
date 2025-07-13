import { Expense } from "@core/domain/models/expense";
import { Pagination } from "@core/domain/models/pagination";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";

abstract class ExpenseUseCase {
	abstract list(filters?: ExpenseFilters): Promise<Pagination<Expense>>;
	abstract create(data: Expense): Promise<void>;
	abstract update(data: Expense, propertyId: string): Promise<void>;
	abstract delete(id: string): Promise<void>;
	abstract listExpenseTypes(): Promise<string[]>;
}

export default ExpenseUseCase;
