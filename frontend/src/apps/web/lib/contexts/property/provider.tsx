import { PropsWithChildren, useCallback, useMemo } from "react";

import { PropertyCTX } from ".";
import { usePanic } from "./hooks";
import PropertyUseCase from "@core/interfaces/usecase/property.use-case";
import { Property } from "@core/domain/models/property";
import { PropertyFilters } from "@core/domain/types/filters/property-filters";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";
import { Expense } from "@core/domain/models/expense";
import { Pagination } from "@core/domain/models/pagination";
import { RentContract } from "@core/domain/models/rent-contract";

interface PropertyProviderProps {
	usecase: PropertyUseCase;
}

const PropertyProvider = ({
	children,
	usecase
}: PropsWithChildren<PropertyProviderProps>): JSX.Element => {
	const panic = usePanic();

	const list = useCallback(
		async (filters?: PropertyFilters) => {
			try {
				const pagination = await usecase.list(filters);
				return pagination;
			} catch (error) {
				panic(error);
				return Pagination.empty<Property>();
			}
		},
		[usecase, panic]
	);

	const deleteProperty = useCallback(
		async (id: string) => {
			try {
				await usecase.delete(id);
				return;
			} catch (error) {
				panic(error);
				return;
			}
		},
		[usecase, panic]
	);

	const create = useCallback(
		async (data: Property) => {
			try {
				await usecase.create(data);
				return;
			} catch (error) {
				panic(error);
				return;
			}
		},
		[usecase, panic]
	);

	const listByID = useCallback(
		async (id: string) => {
			try {
				const response = await usecase.listByID(id);
				return response;
			} catch (error) {
				panic(error);
				return null;
			}
		},
		[usecase, panic]
	);

	const listPropertyContracts = useCallback(
		async (id: string, archived: boolean, page: number) => {
			try {
				const response = await usecase.listPropertyContracts(
					id,
					archived,
					page
				);
				return response;
			} catch (error) {
				panic(error);
				const pagination = new Pagination<RentContract>(1, 10, 0, 0, []);
				return pagination;
			}
		},
		[usecase, panic]
	);

	const update = useCallback(
		async (data: Property) => {
			try {
				await usecase.update(data);
				return;
			} catch (error) {
				panic(error);
				return;
			}
		},
		[usecase, panic]
	);

	const listPropertyExpenses = useCallback(
		async (id: string, page: number, filters?: ExpenseFilters) => {
			try {
				const response = await usecase.listPropertyExpenses(id, page, filters);
				return response;
			} catch (error) {
				panic(error);
				const pagination = new Pagination<Expense>(1, 10, 0, 0, []);
				return pagination;
			}
		},
		[usecase, panic]
	);

	const values = useMemo(
		() => ({
			list,
			deleteProperty,
			create,
			listByID,
			listPropertyContracts,
			update,
			listPropertyExpenses
		}),
		[
			list,
			deleteProperty,
			create,
			listByID,
			listPropertyContracts,
			update,
			listPropertyExpenses
		]
	);

	return <PropertyCTX.Provider value={values}>{children}</PropertyCTX.Provider>;
};

export default PropertyProvider;
