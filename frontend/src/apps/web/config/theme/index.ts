import { ThemeConfig } from "antd";
import "@fontsource/karla"; 

export const THEME_COLORS = {
	PRIMARY_COLOR: "#40534C",
	PRIMARY_DARK_COLOR: "#1A3636",
	PRIMARY_LIGHT_COLOR: "#677D6A",
	SECONDARY_COLOR: "#D6BD98",
};

export const theme = {
	token: {
		fontFamily: "Karla, sans-serif",
		colorPrimary: THEME_COLORS.PRIMARY_COLOR,
		colorBgBase: "#ffffff",
		fontSize: 16
	},
	components: {
		Typography: {
			titleMarginTop: 0,
			fontSizeHeading1: 40,
			fontSizeHeading2: 36,
			fontSizeHeading3: 32,
			fontSizeHeading4: 24,
			fontSizeHeading5: 18,
			fontSizeHeading6: 16
		},
		Form: {
			itemMarginBottom: 8,
			verticalLabelPadding: 4
		},
		Layout: {
			bodyBg: "white",
			headerBg: "white",
			headerPadding: 0
		},
		Button: {
			controlHeight: 36
		}
	}
} as ThemeConfig;
