import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import MangaAltTitles from "../MangaAltTitles.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { Language } from "@mangadex/gql/graphql";
import { writable } from "svelte/store";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/page/chapters/info/MangaAltTitles",
	component: MangaAltTitles,
	tags: ["autodocs"]
} satisfies Meta<MangaAltTitles>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		titles: [
			{
				title: "アイツノカノジョ",
				locale: writable(Language.JapaneseRomanized)
			},
			{
				title: "His girlfriend",
				locale: writable(Language.English)
			},
			{ title: "Sa petite amie", locale: writable(Language.French) }
		]
	}
};
