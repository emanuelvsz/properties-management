import { Tenant } from "@core/domain/models/tenant";
import { DefaultFilters } from "@core/domain/types/filters/default-filters";
import { createContext } from "use-context-selector";

interface Props {
	list(filters?: DefaultFilters): Promise<Tenant[]>;
	listByID(id: string): Promise<Tenant | null>;
	create(data: Tenant): Promise<void>;
	deleteTenant(id: string): Promise<void>;
	update(data: Tenant): Promise<void>;
}

export const TenantCTX = createContext({} as Props);
