import type { Config } from "jest";

export default {
	preset: "ts-jest",
	transform: {
		"^.+\\.(ts|tsx)?$": "ts-jest"
	},
	moduleNameMapper: {
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
		"@infra/(.*)": "<rootDir>src/infra/$1",
		"@core/(.*)": "<rootDir>src/core/$1",
		"@web/(.*)": "<rootDir>src/apps/web/$1"
	},
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
	testMatch: ["**/*.test.tsx", "**/*.test.ts"]
} as Config;
