import { ReturnsSummary } from "@core/domain/models/returns-summary";

abstract class DashboardUseCase {
	abstract listReturnSummary(): Promise<ReturnsSummary>;
}

export default DashboardUseCase;
