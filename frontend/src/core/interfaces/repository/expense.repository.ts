import { Expense } from "@core/domain/models/expense";
import { Mapper } from "@core/domain/models/mapper";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";


interface ExpenseRepository {
	mapper: Mapper<Expense>;

	list(propertyId: string, filters?: ExpenseFilters): Promise<Expense[]>;
	delete(id: string): Promise<void>;
}

export default ExpenseRepository;
