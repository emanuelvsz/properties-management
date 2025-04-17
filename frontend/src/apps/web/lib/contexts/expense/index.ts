import { Expense } from "@core/domain/models/expense";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";
import { createContext } from "use-context-selector";


interface Props {
	list(propertyId: string, filters?: ExpenseFilters): Promise<Expense[]>;
	create(data: Expense): Promise<void>;
	update(data: Expense, propertyId: string): Promise<void>;
	deleteExpense(id: string): Promise<void>;
	listExpenseTypes(): Promise<string[]>
}

export const ExpenseCTX = createContext({} as Props);
