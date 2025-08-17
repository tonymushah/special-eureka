import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import BookmarkButton from "./BookmarkButton.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/page/top-info/stats/Bookmark",
	component: BookmarkButton,
	tags: ["autodocs"]
} satisfies Meta<BookmarkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		bookmarks: 125070
	}
};
