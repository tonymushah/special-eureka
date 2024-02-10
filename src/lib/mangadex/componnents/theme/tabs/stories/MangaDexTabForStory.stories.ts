import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/index.css";

import MangaDexTabsForStory from "./MangaDexTabForStory.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/tabs/MangaDexTheme",
	component: MangaDexTabsForStory,
	tags: ["autodocs"]
} satisfies Meta<MangaDexTabsForStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
