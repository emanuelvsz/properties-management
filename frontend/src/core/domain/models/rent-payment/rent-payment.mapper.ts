import { DTO } from "../../types";
import { Mapper } from "../mapper";
import { RentPayment } from "./rent-payment";

class RentPaymentMapper extends Mapper<RentPayment> {
	deserialize(data: DTO): RentPayment {
		return new RentPayment(
			String(data.id),
			String(data.contract_id),
			Number(data.amount),
			String(data.payment_date),
			String(data.status),
			data.description ? String(data.description) : undefined
		);
	}

	serialize(data: RentPayment): DTO {
		return {
			id: data.id,
			contract_id: data.contractId,
			amount: data.amount,
			payment_date: data.paymentDate,
			status: data.status,
			description: data.description
		};
	}
}

export { RentPaymentMapper };
