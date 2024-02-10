import { createTheme } from "@svelteuidev/core";

export type Accent = {
	default: string;
	hover: string;
	active: string;
};

export type PrimaryColor = {
	primary: string;
	primary1: string;
	primary2: string;
};

export type StatusColor = {
	red: string;
	green: string;
	yellow: string;
	blue: string;
	grey: string;
	purple: string;
};

export type IndicatorColor = {
	blue: string;
};

export type DangerColor = {
	default: string;
	l1: string;
	l2: string;
};

export type ButtonAccentColor = {
	default: string;
	alternate: string;
};

export type ScrollbarColor = {
	default: string;
	hovered: string;
};

export type Accents = {
	default: Accent;
	l1: Accent;
	l2: Accent;
	l3: Accent;
	l4: Accent;
	l5: Accent;
};

export type Contrast = {
	l1: string;
};

export type MangadexTheme = {
	textColor: string;
	mainBackground: string;
	accents: Accents;
	mid_tone: string;
	contrast: Contrast;
	scrollbar: ScrollbarColor;
	button: ButtonAccentColor;
	primary: PrimaryColor;
	status: StatusColor;
	indication: IndicatorColor;
	danger: DangerColor;
};

export const custom: MangadexTheme = {
	textColor: "#ffffff",
	mainBackground: "#191a1c",
	accents: {
		default: {
			default: "#2c2c2c",
			hover: "#393939",
			active: "#1d1d1d"
		},
		l1: {
			default: "#3d3d3d",
			hover: "#494949",
			active: "#272727"
		},
		l2: {
			default: "#4f4f4f",
			hover: "#686868",
			active: "#222222"
		},
		l3: {
			default: "#585858",
			hover: "#707070",
			active: "#3e3e3e"
		},
		l4: {
			default: "#5d5d5d",
			hover: "#686868",
			active: "#373737"
		},
		l5: {
			default: "#666666",
			hover: "#797979",
			active: "#3b3b3b"
		}
	},
	mid_tone: "#8c8c8c",
	contrast: {
		l1: "#4f4f4f"
	},
	scrollbar: {
		default: "#4f4f4f",
		hovered: "#585858"
	},
	button: {
		default: "#4f4f4f",
		alternate: "#2c2c2c"
	},
	primary: {
		primary: "#ff00c0",
		primary1: "#ff18d8",
		primary2: "#dd00c0"
	},
	status: {
		red: "#ff4040",
		green: "#04d000",
		yellow: "#eeff00",
		blue: "#00c9f5",
		grey: "#9d9d9d",
		purple: "#7d40ff"
	},
	indication: {
		blue: "#4b98f1"
	},
	danger: {
		default: "#ff4040",
		l1: "#db3131",
		l2: "#bf2121"
	}
};

export function buildSvelteUITheme({
	primary,
	status,
	accents,
	scrollbar,
	button,
	indication,
	danger: _danger,
	textColor: color,
	mainBackground: backgroundColor,
	contrast
}: MangadexTheme) {
	const {
		red: statusRed,
		green: statusGreen,
		yellow: statusYellow,
		blue: statusBlue,
		grey: statusGrey,
		purple: statusPurple
	} = status;
	const { default: l0, l1, l2, l3, l4, l5 } = accents;
	const { default: danger, l1: dangerl1, l2: dangerl2 } = _danger;
	return createTheme("mangadex", {
		fonts: {
			standard: "Poppins"
		},
		colors: {
			backgroundColor,
			color,
			primary: primary.primary,
			primary1: primary.primary1,
			primary2: primary.primary2,
			statusRed,
			statusGreen,
			statusYellow,
			statusBlue,
			statusGrey,
			statusPurple,
			accent: l0.default,
			accentHover: l0.hover,
			accentActive: l0.active,
			accentL1: l1.default,
			accentL1Hover: l1.hover,
			accentL1Active: l1.active,
			accentL2: l2.default,
			accentL2Hover: l2.hover,
			accentL2Active: l2.active,
			accentL3: l3.default,
			accentL3Hover: l3.hover,
			accentL3Active: l3.active,
			accentL4: l4.default,
			accentL4Hover: l4.hover,
			accentL4Active: l4.active,
			accentL5: l5.default,
			accentL5Hover: l5.hover,
			accentL5Active: l5.active,
			buttonAccent: button.default,
			buttonAccentAlt: button.alternate,
			scrollbar: scrollbar.default,
			scrollbarHover: scrollbar.hovered,
			indicationBlue: indication.blue,
			constrastL1: contrast.l1,
			danger,
			dangerl1,
			dangerl2
		}
	});
}
