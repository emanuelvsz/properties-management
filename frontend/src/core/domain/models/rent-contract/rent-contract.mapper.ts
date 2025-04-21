import { DTO } from "../../types";
import { Mapper } from "../mapper";
import { RentContract } from "./rent-contract";

class RentContractMapper extends Mapper<RentContract> {
	deserialize(data: DTO): RentContract {
		return new RentContract(
			String(data.id),
			String(data.property),
			String(data.user),
			String(data.tenant),
			String(data.startedAt),
			String(data.finishAt),
			Number(data.deposit),
			Boolean(data.archived),
			data.paymentsDate ? String(data.paymentsDate) : null
		);
	}

	serialize(data: RentContract): DTO {
		return {
			id: data.id,
			property: data.propertyId,
			user: data.userId,
			tenant: data.tenant,
			started_at: data.startedAt,
			finish_at: data.finishAt,
			deposit: data.deposit,
			archived: data.archived,
			payments_date: data.paymentsDate,
		};
	}
}

export { RentContractMapper };
