import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import ProgressBar from "./ProgressBar.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/ProgressBar",
	component: ProgressBar,
	tags: ["autodocs"]
} satisfies Meta<ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Solid: Story = {
	args: {
		lineColor: "var(--primary)",
		progress: 25,
		variant: "solid"
	}
};

export const Rounded: Story = {
	args: {
		lineColor: "var(--primary)",
		progress: 50,
		variant: "rounded"
	}
};
