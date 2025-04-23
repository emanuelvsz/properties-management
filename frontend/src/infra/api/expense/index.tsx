import { ExpenseMapper } from "@core/domain/models/expense";
import ExpenseRepository from "@core/interfaces/repository/expense.repository";
import { BackendClient } from "../clients";
import { DTO } from "@core/domain/types";
import { Expense } from "@core/domain/models/expense";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";
import { Pagination } from "@core/domain/models/pagination";

class ExpenseAPI implements ExpenseRepository {
	mapper = new ExpenseMapper();

	async list(filters?: ExpenseFilters): Promise<Pagination<Expense>> {
		const response = await BackendClient.get("/expenses", {
			params: filters
		});
		const { data, page, page_size, count, total } = response.data;
		const expenses = data.map((dto: DTO) => this.mapper.deserialize(dto));
		return new Pagination<Expense>(page, page_size, count, total, expenses);
	}

	async create(data: Expense): Promise<void> {
		return await BackendClient.post("/expenses", data.toJSON());
	}

	async update(data: Expense, propertyId: string): Promise<void> {
		return await BackendClient.patch(`/expenses/${propertyId}`, data.toJSON());
	}

	async delete(id: string): Promise<void> {
		const response = await BackendClient.delete(`/expenses/${id}`);
		return response.data;
	}

	async listExpenseTypes(): Promise<string[]> {
		const response = await BackendClient.get<string[]>("/expenses/types");
		return response.data;
	}
}

export default ExpenseAPI;
