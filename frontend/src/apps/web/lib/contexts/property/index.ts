import { Property } from "@core/domain/models/property";
import { PropertyFilters } from "@core/domain/types/filters/property-filters";
import { createContext } from "use-context-selector";


interface Props {
	list(filters?: PropertyFilters): Promise<Property[]>;
	deleteProperty(id: string): Promise<void>;
	create(data: Property): Promise<void>;
}

export const PropertyCTX = createContext({} as Props);
