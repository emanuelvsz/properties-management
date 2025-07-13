import { DTO } from "@core/domain/types";
import { BackendClient } from "../clients";
import DashboardRepository from "@core/interfaces/repository/dashboard.repository";
import {
	ReturnsSummary,
	ReturnsSummaryMapper
} from "@core/domain/models/returns-summary";

class DashboardAPI implements DashboardRepository {
	mapper = new ReturnsSummaryMapper();

	async listReturnSummary(): Promise<ReturnsSummary> {
		const response = await BackendClient.get<DTO>("/dashboard/returns/summary");
		const data = this.mapper.deserialize(response.data);
		return data;
	}
}

export default DashboardAPI;
