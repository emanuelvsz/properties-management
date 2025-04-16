import ExpenseUseCase from "@core/interfaces/usecase/expense.use-case";
import ExpenseRepository from "@core/interfaces/repository/expense.repository";
import { Expense } from "@core/domain/models/expense";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";

class ExpenseService implements ExpenseUseCase {
	constructor(protected readonly adapter: ExpenseRepository) {}

	async list(propertyId: string, filters?: ExpenseFilters): Promise<Expense[]> {
		 return await this.adapter.list(propertyId, filters)
	}

	async delete(id: string): Promise<void> {
		return await this.adapter.delete(id);
	}
}

export default ExpenseService;
