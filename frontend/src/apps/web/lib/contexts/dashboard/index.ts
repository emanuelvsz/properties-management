import { ReturnsSummary } from "@core/domain/models/returns-summary";
import { createContext } from "use-context-selector";

interface Props {
	listReturnSummary(): Promise<ReturnsSummary | null>;
}

export const DashboardCTX = createContext({} as Props);
