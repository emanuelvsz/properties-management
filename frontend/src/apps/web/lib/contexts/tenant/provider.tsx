import { App } from "antd";

import { PropsWithChildren, useCallback, useMemo } from "react";

import { usePanic } from "./hooks";
import TenantUseCase from "@core/interfaces/usecase/tenant.use-case";
import { DefaultFilters } from "@core/domain/types/filters/default-filters";
import { TenantCTX } from ".";

interface TenantProviderProps {
	usecase: TenantUseCase;
}

const TenantProvider = ({
	children,
	usecase
}: PropsWithChildren<TenantProviderProps>): JSX.Element => {
	const panic = usePanic();
	const { message } = App.useApp();

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
		[message, panic, usecase]
	);

	const values = useMemo(
		() => ({
			list
		}),
		[list]
	);

	return <TenantCTX.Provider value={values}>{children}</TenantCTX.Provider>;
};

export default TenantProvider;
