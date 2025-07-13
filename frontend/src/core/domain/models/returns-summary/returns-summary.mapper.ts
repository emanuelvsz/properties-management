import { DTO } from "../../types";
import { Mapper } from "../mapper";
import { ReturnsSummary } from "./returns-summary";

class ReturnsSummaryMapper extends Mapper<ReturnsSummary> {
	deserialize(data: DTO): ReturnsSummary {
		const gross = Number(data.gross);
		const expenses = Number(data.expenses);
		const liquid = Number(data.liquid);

		return new ReturnsSummary(gross, expenses, liquid);
	}

	serialize(data: ReturnsSummary): DTO {
		return {
			gross: data.gross,
			expenses: data.expenses,
			liquid: data.liquid
		};
	}
}

export { ReturnsSummaryMapper };
