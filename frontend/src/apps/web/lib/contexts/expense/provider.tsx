import { App } from "antd";

import { PropsWithChildren, useCallback, useMemo } from "react";

import { usePanic } from "./hooks";
import { ExpenseCTX } from ".";
import ExpenseUseCase from "@core/interfaces/usecase/expense.use-case";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";

interface ExpenseProviderProps {
	usecase: ExpenseUseCase;
}

const ExpenseProvider = ({
	children,
	usecase
}: PropsWithChildren<ExpenseProviderProps>): JSX.Element => {
	const panic = usePanic();
	const { message } = App.useApp();

	const list = useCallback(
		async (propertyId: string, filters?: ExpenseFilters) => {
			try {
				const expenses = await usecase.list(propertyId, filters);
				return expenses;
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

	return <ExpenseCTX.Provider value={values}>{children}</ExpenseCTX.Provider>;
};

export default ExpenseProvider;
