import { PropsWithChildren, useCallback, useMemo } from "react";

import { usePanic } from "./hooks";
import { ExpenseCTX } from ".";
import ExpenseUseCase from "@core/interfaces/usecase/expense.use-case";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";
import { Expense } from "@core/domain/models/expense";
import { Pagination } from "@core/domain/models/pagination";

interface ExpenseProviderProps {
	usecase: ExpenseUseCase;
}

const ExpenseProvider = ({
	children,
	usecase
}: PropsWithChildren<ExpenseProviderProps>): JSX.Element => {
	const panic = usePanic();

	const list = useCallback(
		async (filters?: ExpenseFilters) => {
			try {
				const expenses = await usecase.list(filters);
				return expenses;
			} catch (error) {
				panic(error);
				return Pagination.empty<Expense>();
			}
		},
		[usecase, panic]
	);

	const create = useCallback(
		async (data: Expense) => {
			try {
				await usecase.create(data);
			} catch (error) {
				panic(error);
			}
		},
		[usecase, panic]
	);

	const deleteExpense = useCallback(
		async (id: string) => {
			try {
				await usecase.delete(id);
			} catch (error) {
				panic(error);
			}
		},
		[usecase, panic]
	);

	const listExpenseTypes = useCallback(async () => {
		try {
			return await usecase.listExpenseTypes();
		} catch (error) {
			panic(error);
			return [];
		}
	}, [usecase, panic]);

	const update = useCallback(
		async (data: Expense, propertyId: string) => {
			try {
				await usecase.update(data, propertyId);
			} catch (error) {
				panic(error);
			}
		},
		[usecase, panic]
	);

	const values = useMemo(
		() => ({
			list,
			create,
			deleteExpense,
			listExpenseTypes,
			update
		}),
		[list, create, deleteExpense, listExpenseTypes, update]
	);

	return <ExpenseCTX.Provider value={values}>{children}</ExpenseCTX.Provider>;
};

export default ExpenseProvider;
