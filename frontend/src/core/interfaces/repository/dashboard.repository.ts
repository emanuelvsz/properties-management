import { ReturnsSummary } from "@core/domain/models/returns-summary";

interface DashboardRepository {
	listReturnSummary(): Promise<ReturnsSummary>;
}

export default DashboardRepository;