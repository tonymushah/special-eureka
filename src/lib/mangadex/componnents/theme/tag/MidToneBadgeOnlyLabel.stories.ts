import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import MidToneBadge from "./MidToneBadgeOnlyLabel.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/tag/MidToneBadge",
	component: MidToneBadge,
	tags: ["autodocs"]
} satisfies Meta<MidToneBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

const label = "Tag";

export const Default: Story = {
	args: {
		label
	}
};
