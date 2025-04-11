import { App } from "antd";

import { PropsWithChildren, useCallback, useMemo } from "react";

import { PropertyCTX } from ".";
import { usePanic } from "./hooks";
import PropertyUseCase from "@core/interfaces/usecase/property.repository";
import { Property } from "@core/domain/models/property";

interface PropertyProviderProps {
	usecase: PropertyUseCase;
}

const PropertyProvider = ({
	children,
	usecase
}: PropsWithChildren<PropertyProviderProps>): JSX.Element => {
	const panic = usePanic();
	const { message } = App.useApp();

	const list = useCallback(async () => {
		try {
			const properties = await usecase.list();
			return properties;
		} catch (error) {
			panic(error);
			return [];
		}
	}, [message, panic, usecase]);

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
		[message, panic, usecase]
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
		[message, panic, usecase]
	);

	const values = useMemo(
		() => ({
			list,
			deleteProperty,
			create
		}),
		[list]
	);

	return <PropertyCTX.Provider value={values}>{children}</PropertyCTX.Provider>;
};

export default PropertyProvider;
