import { css } from "@emotion/react";
import { App as AntdApp, ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";

import Empty from "./components/empty";
import Scaffold from "./components/scaffold";
import { theme } from "./config/theme";
import DIContainer from "./dicontainer";
import AuthProvider from "./lib/contexts/auth/provider";
import PropertyProvider from "./lib/contexts/property/provider";
import ExpenseProvider from "./lib/contexts/expense/provider";
import I18nProvider from "./lib/contexts/i18n/provider";
import DashboardProvider from "./lib/contexts/dashboard/provider";
import TenantProvider from "./lib/contexts/tenant/provider";

const styles = {
	antAppRoot: css`
		height: 100vh;
	`
};

const App = () => (
	<ConfigProvider theme={theme} renderEmpty={() => <Empty />}>
		<I18nProvider>
			<AntdApp css={styles.antAppRoot} message={{ maxCount: 1 }}>
				<BrowserRouter>
					<AuthProvider usecase={DIContainer.getAuthUseCase()}>
						<PropertyProvider usecase={DIContainer.getPropertyUseCase()}>
							<ExpenseProvider usecase={DIContainer.getExpenseUseCase()}>
								<DashboardProvider usecase={DIContainer.getDashboardUseCase()}>
									<TenantProvider usecase={DIContainer.getTenantUseCase()}>
										<Scaffold />
									</TenantProvider>
								</DashboardProvider>
							</ExpenseProvider>
						</PropertyProvider>
					</AuthProvider>
				</BrowserRouter>
			</AntdApp>
		</I18nProvider>
	</ConfigProvider>
);

export default App;
