import { ReturnsSummary } from "@core/domain/models/returns-summary";
import DashboardRepository from "@core/interfaces/repository/dashboard.repository";
import DashboardUseCase from "@core/interfaces/usecase/dashboard.use-case";

class DashboardService implements DashboardUseCase {
	constructor(protected readonly adapter: DashboardRepository) {}

	async listReturnSummary(): Promise<ReturnsSummary> {
		return await this.adapter.listReturnSummary();
	}
}

export default DashboardService;
