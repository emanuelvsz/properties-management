import { Property } from "@core/domain/models/property";
import { createContext } from "use-context-selector";


interface Props {
	list(): Promise<Property[]>;
}

export const PropertyCTX = createContext({} as Props);
