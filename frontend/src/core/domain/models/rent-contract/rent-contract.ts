import { Model } from "../model";

class RentContract extends Model {
	#id: string;
	#propertyId: string;
	#userId: string;
	#tenant: string;
	#startedAt: string;
	#finishAt: string;
	#deposit: number;
	#archived: boolean;
	#paymentsDate?: string | null;

	constructor(
		id: string,
		propertyId: string,
		userId: string,
		tenant: string,
		startedAt: string,
		finishAt: string,
		deposit: number,
		archived: boolean,
		paymentsDate?: string | null
	) {
		super();
		this.#id = id;
		this.#propertyId = propertyId;
		this.#userId = userId;
		this.#tenant = tenant;
		this.#startedAt = startedAt;
		this.#finishAt = finishAt;
		this.#deposit = deposit;
		this.#archived = archived;
		this.#paymentsDate = paymentsDate;
	}

	static fromForm(formData: any): RentContract {
		return new RentContract(
			formData.id,
			formData.property,
			formData.user,
			formData.tenant,
			formData.started_at,
			formData.finish_at,
			formData.deposit,
			formData.archived,
			formData.payments_date
		);
	}

	public toJSON() {
		return {
			id: this.#id,
			property: this.#propertyId,
			user: this.#userId,
			tenant: this.#tenant,
			started_at: this.#startedAt,
			finish_at: this.#finishAt,
			deposit: this.#deposit,
			payments_date: this.#paymentsDate,
			archived: this.#archived
		};
	}

	get id() {
		return this.#id;
	}

	get propertyId() {
		return this.#propertyId;
	}

	get userId() {
		return this.#userId;
	}

	get tenant() {
		return this.#tenant;
	}

	get startedAt() {
		return this.#startedAt;
	}

	get finishAt() {
		return this.#finishAt;
	}

	get deposit() {
		return this.#deposit;
	}

	get archived() {
		return this.#archived;
	}

	get paymentsDate() {
		return this.#paymentsDate;
	}
}

export { RentContract };
