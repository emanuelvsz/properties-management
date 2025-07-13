import { Model } from "../model";

class RentPayment extends Model {
	#id: string;
	#contractId: string;
	#amount: number;
	#paymentDate: string;
	#status: string;
	#description?: string;

	constructor(
		id: string,
		contractId: string,
		amount: number,
		paymentDate: string,
		status: string,
		description?: string
	) {
		super();
		this.#id = id;
		this.#contractId = contractId;
		this.#amount = amount;
		this.#paymentDate = paymentDate;
		this.#status = status;
		this.#description = description;
	}

	static fromForm(formData: any): RentPayment {
		return new RentPayment(
			formData.id,
			formData.contract_id,
			formData.amount,
			formData.payment_date,
			formData.status,
			formData.description
		);
	}

	public toJSON() {
		return {
			id: this.#id,
			contract_id: this.#contractId,
			amount: this.#amount,
			payment_date: this.#paymentDate,
			status: this.#status,
			description: this.#description
		};
	}

	get id() {
		return this.#id;
	}

	get contractId() {
		return this.#contractId;
	}

	get amount() {
		return this.#amount;
	}

	get paymentDate() {
		return this.#paymentDate;
	}

	get status() {
		return this.#status;
	}

	get description() {
		return this.#description;
	}
}

export { RentPayment };
