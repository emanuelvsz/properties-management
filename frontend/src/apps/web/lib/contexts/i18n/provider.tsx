import { PropsWithChildren, useCallback, useMemo } from "react";

import { IntlProvider } from "react-intl";

import useLocalStorage from "use-local-storage";

import { i18nCTX } from ".";

const languageFilesModules = import.meta.glob("./language/*.json", {
	eager: true
});
const languageFiles: Record<string, Record<string, string>> = Object.keys(
	languageFilesModules
).reduce((acc, fileName) => {
	const file = languageFilesModules[fileName];
	const [languageName] = fileName.split("/").at(-1)?.split(".") ?? [];
	if (!languageName) {
		return acc;
	}
	return {
		...acc,
		[languageName]: (file as Record<string, unknown>).default as Record<
			string,
			string
		>
	};
}, {});

// Discuss about these specific languages

export const LANGUAGE_STORAGE_KEY = "language";
export const DEFAULT_LANGUAGE = "en-US";
const possibleLanguages = Object.keys(languageFiles);

const getBrowserLanguage = () => {
	const browserLanguage = navigator.language;
	switch (browserLanguage) {
		case "en":
		case "en-GB":
			return DEFAULT_LANGUAGE;
		case "pt":
			return "pt-BR";
		case "es":
			return "es-ES";
		default:
			return DEFAULT_LANGUAGE;
	}
};

const I18nProvider = ({ children }: PropsWithChildren) => {
	const [selectedLanguage, setSelectedLanguage] = useLocalStorage(
		LANGUAGE_STORAGE_KEY,
		getBrowserLanguage()
	);
	const messages = languageFiles[selectedLanguage];

	const changeLanguage = useCallback(
		(language: string) => {
			if (!possibleLanguages.includes(language)) {
				return;
			}
			setSelectedLanguage(language);
		},
		[setSelectedLanguage]
	);

	const value = useMemo(
		() => ({
			languages: possibleLanguages,
			selectedLanguage,
			changeLanguage
		}),
		[changeLanguage, selectedLanguage]
	);

	return (
		<i18nCTX.Provider value={value}>
			<IntlProvider locale={selectedLanguage} messages={messages}>
				{children}
			</IntlProvider>
		</i18nCTX.Provider>
	);
};

export default I18nProvider;
