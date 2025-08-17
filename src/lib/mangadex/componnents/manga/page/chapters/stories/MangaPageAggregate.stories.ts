import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import MangaPageChapters from "../MangaPageAggregate.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/page/chapters/ChaptersAggregate",
	component: MangaPageChapters,
	tags: ["autodocs"]
} satisfies Meta<MangaPageChapters>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
