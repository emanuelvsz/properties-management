import { Model } from "../model";

class Expense extends Model {
	#id: string;
	#createdAt: string;
	#updatedAt: string;
	#name: string;
	#expenseValue: number;
	#description: string;
	#dueDate: string;
	#payedAt: string | null;
	#property: string;
	#expenseType: string;

	constructor(
		id: string,
		createdAt: string,
		updatedAt: string,
		name: string,
		expenseValue: number,
		description: string,
		dueDate: string,
		payedAt: string | null,
		property: string,
		expenseType: string
	) {
		super();
		this.#id = id;
		this.#createdAt = createdAt;
		this.#updatedAt = updatedAt;
		this.#name = name;
		this.#expenseValue = expenseValue;
		this.#description = description;
		this.#dueDate = dueDate;
		this.#payedAt = payedAt;
		this.#property = property;
		this.#expenseType = expenseType;
	}

	static fromForm(formData: any): Expense {
		const data = new Expense(
			formData.id,
			formData.created_at,
			formData.updated_at,
			formData.name,
			formData.expense_value,
			formData.description,
			formData.due_date,
			formData.payed_at,
			formData.property,
			formData.expense_type
		);
		return data
	}

	public toJSON() {
		const data = {
			id: this.#id,
			created_at: this.#createdAt,
			updated_at: this.#updatedAt,
			name: this.#name,
			expense_value: this.#expenseValue,
			description: this.#description,
			due_date: this.#dueDate,
			payed_at: this.#payedAt,
			property: this.#property,
			expense_type: this.#expenseType,
		};
		return data
	}

	get id() {
		return this.#id;
	}
	get createdAt() {
		return this.#createdAt;
	}
	get updatedAt() {
		return this.#updatedAt;
	}
	get name() {
		return this.#name;
	}
	get expenseValue() {
		return this.#expenseValue;
	}
	get description() {
		return this.#description;
	}
	get dueDate() {
		return this.#dueDate;
	}
	get payedAt() {
		return this.#payedAt;
	}
	get property() {
		return this.#property;
	}
	get expenseType() {
		return this.#expenseType;
	}
}

export { Expense };
