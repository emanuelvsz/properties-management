import { PropsWithChildren, useCallback, useMemo } from "react";
import { usePanic } from "./hooks";
import TenantUseCase from "@core/interfaces/usecase/tenant.use-case";
import { DefaultFilters } from "@core/domain/types/filters/default-filters";
import { TenantCTX } from ".";
import { Tenant } from "@core/domain/models/tenant";

interface TenantProviderProps {
	usecase: TenantUseCase;
}

const TenantProvider = ({
	children,
	usecase
}: PropsWithChildren<TenantProviderProps>): JSX.Element => {
	const panic = usePanic();

	const list = useCallback(
		async (filters?: DefaultFilters) => {
			try {
				const tenants = await usecase.list(filters);
				return tenants;
			} catch (error) {
				panic(error);
				return [];
			}
		},
		[panic, usecase]
	);

	const listByID = useCallback(
		async (id: string) => {
			try {
				const tenant = await usecase.listByID(id);
				return tenant;
			} catch (error) {
				panic(error);
				return null;
			}
		},
		[panic, usecase]
	);

	const create = useCallback(
		async (data: Tenant) => {
			try {
				await usecase.create(data);
			} catch (error) {
				panic(error);
			}
		},
		[panic, usecase]
	);

	const update = useCallback(
		async (data: Tenant) => {
			try {
				await usecase.update(data);
			} catch (error) {
				panic(error);
			}
		},
		[panic, usecase]
	);

	const deleteTenant = useCallback(
		async (id: string) => {
			try {
				await usecase.delete(id);
			} catch (error) {
				panic(error);
			}
		},
		[panic, usecase]
	);

	const values = useMemo(
		() => ({
			list,
			listByID,
			create,
			update,
			deleteTenant
		}),
		[list, listByID, create, update, deleteTenant]
	);

	return <TenantCTX.Provider value={values}>{children}</TenantCTX.Provider>;
};

export default TenantProvider;
