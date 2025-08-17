import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import DistributionItem from "./DistributionItem.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/page/top-info/stats/DistributionItem",
	component: DistributionItem,
	tags: ["autodocs"]
} satisfies Meta<DistributionItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		distribution: 1,
		total: 1000,
		value: 450
	}
};
