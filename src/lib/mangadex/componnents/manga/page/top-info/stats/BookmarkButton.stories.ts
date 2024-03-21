import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import Note from "./BookmarkButton.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/page/top-info/stats/Bookmark",
	component: Note,
	tags: ["autodocs"]
} satisfies Meta<Note>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		bookmarks: 125070
	}
};
