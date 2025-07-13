import DashboardUseCase from "@core/interfaces/usecase/dashboard.use-case";
import { PropsWithChildren, useCallback, useMemo } from "react";
import { usePanic } from "./hooks";
// import { App } from "antd";
import { DashboardCTX } from ".";

interface DashboardProviderProps {
	usecase: DashboardUseCase;
}

const DashboardProvider = ({
	children,
	usecase
}: PropsWithChildren<DashboardProviderProps>): JSX.Element => {
	const panic = usePanic();

	const listReturnSummary = useCallback(async () => {
		try {
			const summary = await usecase.listReturnSummary();
			return summary;
		} catch (error) {
			panic(error);
			return null;
		}
	}, [usecase, panic]);

	const values = useMemo(
		() => ({
			listReturnSummary
		}),
		[listReturnSummary]
	);

	return (
		<DashboardCTX.Provider value={values}>{children}</DashboardCTX.Provider>
	);
};

export default DashboardProvider;
