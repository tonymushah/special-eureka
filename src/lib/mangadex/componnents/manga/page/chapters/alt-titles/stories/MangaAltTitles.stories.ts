import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import MangaAltTitles from "../MangaAltTitles.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { Language } from "@mangadex/gql/graphql";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/page/chapters/MangaAltTitles",
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
				locale: Language.JapaneseRomanized
			},
			{
				title: "His girlfriend",
				locale: Language.English
			},
			{ title: "Sa petite amie", locale: Language.French }
		]
	}
};
