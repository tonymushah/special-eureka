import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import ColorPickerVarProvider from "./ColorPickerThemeVarProviderForStories.svelte";
import MangadexThemeProviderForStory from "../../MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/editor/ColorPicker/VarThemeProvider",
	component: ColorPickerVarProvider,
	tags: ["autodocs"]
} satisfies Meta<ColorPickerVarProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
