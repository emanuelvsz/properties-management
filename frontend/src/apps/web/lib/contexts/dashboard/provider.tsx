import DashboardUseCase from "@core/interfaces/usecase/dashboard.use-case";
import { PropsWithChildren, useCallback, useMemo } from "react";
import { usePanic } from "./hooks";
import { App } from "antd";
import { DashboardCTX } from ".";

interface DashboardProviderProps {
	usecase: DashboardUseCase;
}

const DashboardProvider = ({
	children,
	usecase
}: PropsWithChildren<DashboardProviderProps>): JSX.Element => {
	const panic = usePanic();
	const { message } = App.useApp();

	const listReturnSummary = useCallback(async () => {
		try {
			console.log("Hey 2");
			const summary = await usecase.listReturnSummary();
			return summary;
		} catch (error) {
			panic(error);
			return null;
		}
	}, [message, panic, usecase]);

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
