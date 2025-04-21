import { RentContract } from "@core/domain/models/rent-contract";
import { DefaultFilters } from "@core/domain/types/filters/default-filters";
import { createContext } from "use-context-selector";


interface Props {
	list(filters?: DefaultFilters): Promise<RentContract[]>;
	deleteContract(id: string): Promise<void>;
	create(data: RentContract): Promise<void>;
	update(data: RentContract): Promise<void>;
}

export const RentContractCTX = createContext({} as Props);
