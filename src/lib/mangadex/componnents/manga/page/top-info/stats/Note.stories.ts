import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import Note from "./NoteForStories.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/page/top-info/stats/Note",
	component: Note,
	tags: ["autodocs"]
} satisfies Meta<Note>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		average: 7.64,
		inner: {
			10: 80,
			9: 28,
			8: 40,
			7: 28,
			6: 11,
			5: 11,
			4: 10,
			3: 4,
			2: 6,
			1: 20
		}
	}
};
