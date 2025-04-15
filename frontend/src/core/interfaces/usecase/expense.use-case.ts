import { Expense } from "@core/domain/models/expense";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";

abstract class ExpenseUseCase {
    abstract list(propertyId: string, filters?: ExpenseFilters): Promise<Expense[]>;
    
}

export default ExpenseUseCase;
