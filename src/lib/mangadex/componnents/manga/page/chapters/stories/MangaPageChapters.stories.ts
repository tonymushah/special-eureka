import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import MangaPageChapters from "../MangaPageChapters.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/page/Chapters",
	component: MangaPageChapters,
	tags: ["autodocs"]
} satisfies Meta<MangaPageChapters>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
