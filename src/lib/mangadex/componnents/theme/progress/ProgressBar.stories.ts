import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import ProgressBar from "./ProgressBar.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/progress-bar",
	component: ProgressBar,
	tags: ["autodocs"]
} satisfies Meta<ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		lineColor: "var(--primary)",
		progress: 50
	}
};
