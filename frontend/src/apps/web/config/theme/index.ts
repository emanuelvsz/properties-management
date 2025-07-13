import { ThemeConfig } from "antd";
import "@fontsource/karla";

export const THEME_COLORS = {
	PRIMARY_COLOR: "#5d776e",
	PRIMARY_DARK_COLOR: "#1A3636",
	PRIMARY_LIGHT_COLOR: "#677D6A",
	SECONDARY_COLOR: "#D6BD98",
	GRAY_COLOR: "#F5F5F5",
	GRAY_LIGHT_COLOR: "#F5F5F5",
	WHITE_COLOR: "#FFF",
	LIGHT_GREEN_COLOR: "#00BA7F",
	LIGHT_RED_COLOR: "#FF4D4F",
	TRANSPARENT_COLOR: "transparent"
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
			controlHeight: 36,
			boxShadow: "none"
		},
		DatePicker: {
			borderRadius: 6
		},
		Card: {
			borderRadius: 6
		},
		Table: {
			borderRadius: 6
		},
		Dropdown: {
			algorithm: true,
			borderRadius: 6,
			colorText: THEME_COLORS.PRIMARY_COLOR
		}
	}
} as ThemeConfig;
