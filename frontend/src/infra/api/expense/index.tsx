import { ExpenseMapper } from "@core/domain/models/expense";
import ExpenseRepository from "@core/interfaces/repository/expense.repository";
import { BackendClient } from "../clients";
import { DTO } from "@core/domain/types";
import { Expense } from "@core/domain/models/expense";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";

class ExpenseAPI implements ExpenseRepository {
	mapper = new ExpenseMapper();

	async list(propertyId: string, filters?: ExpenseFilters): Promise<Expense[]> {
		const response = await BackendClient.get<DTO[]>(
			`/properties/${propertyId}/expenses`,
			{
				params: filters
			}
		);

		const expensesDTOs = response.data;
		return expensesDTOs.map((dto) => this.mapper.deserialize(dto));
	}

	async delete(id: string): Promise<void> {
		const response = await BackendClient.delete(`/expenses/${id}`);
		return response.data;
	}
}

export default ExpenseAPI;
