import RentContractUseCase from "@core/interfaces/usecase/rent-contract.use-case";
import { usePanic } from "./hooks";
import { App } from "antd";
import { PropsWithChildren, useCallback, useMemo } from "react";
import { DefaultFilters } from "@core/domain/types/filters/default-filters";
import { RentContract } from "@core/domain/models/rent-contract";
import { RentContractCTX } from ".";

interface RentContractProviderProps {
	usecase: RentContractUseCase;
}

const RentContractProvider = ({
	children,
	usecase
}: PropsWithChildren<RentContractProviderProps>): JSX.Element => {
	const panic = usePanic();
	const { message } = App.useApp();

	const list = useCallback(
		async (filters?: DefaultFilters) => {
			try {
				const properties = await usecase.list(filters);
				return properties;
			} catch (error) {
				panic(error);
				return [];
			}
		},
		[message, panic, usecase]
	);

	const deleteContract = useCallback(
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
		async (data: RentContract) => {
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

	const update = useCallback(
		async (data: RentContract) => {
			try {
				await usecase.update(data);
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
			deleteContract,
			create,
			update
		}),
		[list]
	);

	return (
		<RentContractCTX.Provider value={values}>
			{children}
		</RentContractCTX.Provider>
	);
};

export default RentContractProvider;
