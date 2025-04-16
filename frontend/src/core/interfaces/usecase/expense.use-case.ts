import { Expense } from "@core/domain/models/expense";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";

abstract class ExpenseUseCase {
    abstract list(propertyId: string, filters?: ExpenseFilters): Promise<Expense[]>;
    abstract delete(id: string): Promise<void>;
}

export default ExpenseUseCase;
