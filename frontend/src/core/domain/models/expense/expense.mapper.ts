import { DTO } from "../../types";
import { Mapper } from "../mapper";
import { Expense } from "./expense";

class ExpenseMapper extends Mapper<Expense> {
	deserialize(data: DTO): Expense {
		return new Expense(
			String(data.id),
			String(data.createdAt),
			String(data.updatedAt),
			String(data.name),
			Number(data.expenseValue),
			String(data.description),
			String(data.dueDate),
			data.payedAt ? String(data.payedAt) : null,
			String(data.property),
			String(data.expenseType)
		);
	}

	serialize(data: Expense): DTO {
		return {
			id: data.id,
			created_at: data.createdAt,
			updated_at: data.updatedAt,
			name: data.name,
			expense_value: data.expenseValue,
			description: data.description,
			due_date: data.dueDate,
			payed_at: data.payedAt,
			property: data.property,
			expense_type: data.expenseType
		};
	}
}

export { ExpenseMapper };
