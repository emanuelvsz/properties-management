import react from "@vitejs/plugin-react";
import path from "node:path";
import url from "node:url";
import { ConfigEnv, defineConfig, loadEnv } from "vite";
import configureTSConfigPaths from "vite-tsconfig-paths";

import { webSchema } from "./lib/env/schema";

const DEFAULT_WEB_PORT = 3000;
const ROOT_HTML_FILE = "./index.html";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
	const dirname = path.dirname(url.fileURLToPath(import.meta.url));
	const env = loadEnv(mode, dirname, "");
	const envForWeb = Object.keys(env)
		.filter((key) => key.startsWith("WEB_"))
		.reduce<Record<string, string>>(
			(acc, key) => ({
				...acc,
				[key]: env[key]
			}),
			{}
		);
	const { value: finalEnv, error } = webSchema.validate(envForWeb);
	if (error) {
		throw error;
	}
	return {
		plugins: [
			react({
				jsxImportSource: "@emotion/react",
				babel: {
					plugins: ["@emotion/babel-plugin"]
				}
			}),
			configureTSConfigPaths({
				projects: [path.join(process.cwd(), "tsconfig.json")]
			})
		],
		root: dirname,
		publicDir: "./public",
		server: {
			open: ROOT_HTML_FILE,
			port: DEFAULT_WEB_PORT,
			proxy: {
				"/api": {
					target: "http://localhost:8000",
					changeOrigin: true,
					rewrite: (path: string) => path.replace(/^\/api/, "")
				}
			}
		},
		define: {
			"process.env": finalEnv
		},
		build: {
			outDir: path.join(process.cwd(), "build"),
			rollupOptions: {
				input: path.join(dirname, ROOT_HTML_FILE)
			}
		},
		preview: {
			port: DEFAULT_WEB_PORT
		}
	};
});
