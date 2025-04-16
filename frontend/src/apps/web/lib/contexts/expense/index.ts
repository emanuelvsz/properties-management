import { Expense } from "@core/domain/models/expense";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";
import { createContext } from "use-context-selector";


interface Props {
	list(propertyId: string, filters?: ExpenseFilters): Promise<Expense[]>;
	deleteExpense(id: string): Promise<void>;
}

export const ExpenseCTX = createContext({} as Props);
