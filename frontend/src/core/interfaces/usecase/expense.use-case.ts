import { Expense } from "@core/domain/models/expense";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";

abstract class ExpenseUseCase {
    abstract list(propertyId?: string, filters?: ExpenseFilters): Promise<Expense[]>;
    abstract create(data: Expense): Promise<void>;
    abstract update(data: Expense, propertyId: string): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract listExpenseTypes(): Promise<string[]>
}

export default ExpenseUseCase;
