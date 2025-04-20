import { Model } from "../model";

class ReturnsSummary extends Model {
	#gross: number;
	#expenses: number;
	#liquid: number;

	constructor(
		gross: number,
		expenses: number,
		liquid: number
	) {
		super();
		this.#gross = gross;
		this.#expenses = expenses;
		this.#liquid = liquid;
	}

	static fromForm(formData: any): ReturnsSummary {
		return new ReturnsSummary(
			formData.gross,
			formData.expenses,
			formData.liquid
		);
	}

	public toJSON() {
		return {
			gross: this.#gross,
			expenses: this.#expenses,
			liquid: this.#liquid,
		};
	}

	get gross() {
		return this.#gross;
	}

	get expenses() {
		return this.#expenses;
	}

	get liquid() {
		return this.#liquid;
	}	
}

export { ReturnsSummary };
