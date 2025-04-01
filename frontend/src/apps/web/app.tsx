import { css } from "@emotion/react";
import { App as AntdApp, ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";

import Empty from "./components/empty";
import Scaffold from "./components/scaffold";
import { theme } from "./config/theme";
import DIContainer from "./dicontainer";
import AuthProvider from "./lib/contexts/auth/provider";

const styles = {
	antAppRoot: css`
		height: 100vh;
	`
};

const App = () => (
	<ConfigProvider theme={theme} renderEmpty={() => <Empty />}>
		<AntdApp css={styles.antAppRoot} message={{ maxCount: 1 }}>
			<BrowserRouter>
				<AuthProvider usecase={DIContainer.getAuthUseCase()}>
					<Scaffold />
				</AuthProvider>
			</BrowserRouter>
		</AntdApp>
	</ConfigProvider>
);

export default App;
