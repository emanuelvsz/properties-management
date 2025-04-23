import ExpenseUseCase from "@core/interfaces/usecase/expense.use-case";
import ExpenseRepository from "@core/interfaces/repository/expense.repository";
import { Expense } from "@core/domain/models/expense";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";
import { Pagination } from "@core/domain/models/pagination";

class ExpenseService implements ExpenseUseCase {
	constructor(protected readonly adapter: ExpenseRepository) {}

	async list(filters?: ExpenseFilters): Promise<Pagination<Expense>> {
		 return await this.adapter.list(filters)
	}

	async create(data: Expense): Promise<void> {
		return await this.adapter.create(data);
	}

	async update(data: Expense, propertyId: string): Promise<void> {
		return await this.adapter.update(data, propertyId)
	}

	async delete(id: string): Promise<void> {
		return await this.adapter.delete(id);
	}

	async listExpenseTypes(): Promise<string[]>{
		return await this.adapter.listExpenseTypes();
	}
}

export default ExpenseService;
