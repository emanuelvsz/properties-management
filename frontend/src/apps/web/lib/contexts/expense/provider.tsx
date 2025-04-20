import { App } from "antd";

import { PropsWithChildren, useCallback, useMemo } from "react";

import { usePanic } from "./hooks";
import { ExpenseCTX } from ".";
import ExpenseUseCase from "@core/interfaces/usecase/expense.use-case";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";
import { Expense } from "@core/domain/models/expense";

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
		async (propertyId?: string, filters?: ExpenseFilters) => {
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

	const create = useCallback(
		async (data: Expense) => {
			try {
				await usecase.create(data);
			} catch (error) {
				panic(error);
			}
		},
		[message, panic, usecase]
	);

	const deleteExpense = useCallback(
		async (id: string) => {
			try {
				await usecase.delete(id);
			} catch (error) {
				panic(error);
			}
		},
		[message, panic, usecase]
	);

	const listExpenseTypes = useCallback(async () => {
		try {
			return await usecase.listExpenseTypes();
		} catch (error) {
			panic(error);
			return [];
		}
	}, [message, panic, usecase]);

	const update = useCallback(
		async (data: Expense, propertyId: string) => {
			try {
				await usecase.update(data, propertyId);
			} catch (error) {
				panic(error);
			}
		},
		[message, panic, usecase]
	);

	const values = useMemo(
		() => ({
			list,
			create,
			deleteExpense,
			listExpenseTypes,
			update
		}),
		[list]
	);

	return <ExpenseCTX.Provider value={values}>{children}</ExpenseCTX.Provider>;
};

export default ExpenseProvider;
