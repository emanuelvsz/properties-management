import { Tenant } from "@core/domain/models/tenant";
import { DefaultFilters } from "@core/domain/types/filters/default-filters";
import { createContext } from "use-context-selector";


interface Props {
	list(filters?: DefaultFilters): Promise<Tenant[]>;
}

export const TenantCTX = createContext({} as Props);
