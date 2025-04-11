import { Property } from "@core/domain/models/property";
import { createContext } from "use-context-selector";


interface Props {
	list(): Promise<Property[]>;
	deleteProperty(id: string): Promise<void>;
	create(data: Property): Promise<void>;
}

export const PropertyCTX = createContext({} as Props);
