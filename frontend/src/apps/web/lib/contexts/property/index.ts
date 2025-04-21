import { Property } from "@core/domain/models/property";
import { RentContract } from "@core/domain/models/rent-contract";
import { PropertyFilters } from "@core/domain/types/filters/property-filters";
import { createContext } from "use-context-selector";


interface Props {
	list(filters?: PropertyFilters): Promise<Property[]>;
	deleteProperty(id: string): Promise<void>;
	create(data: Property): Promise<void>;
	update(data: Property): Promise<void>;
	listByID(id: string): Promise<Property | null>;
	listContracts(id: string, archived: boolean): Promise<RentContract[]>
}

export const PropertyCTX = createContext({} as Props);
