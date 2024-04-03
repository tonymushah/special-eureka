import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import icon from "../links/images/favicon.ico";
import MangaPageChapters from "../MangaPageChaptersInfo.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { v4 } from "uuid";
import { writable } from "svelte/store";
import { Language } from "@mangadex/gql/graphql";

enum IdTitleKey {
	Author,
	Artist
}

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/page/chapters/Chapters",
	component: MangaPageChapters,
	tags: ["autodocs"]
} satisfies Meta<MangaPageChapters<IdTitleKey>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		idsKeysItem: [
			{
				title: "Authors",
				key: IdTitleKey.Author,
				items: [
					{
						id: v4(),
						name: "Tony Mushah"
					}
				]
			},
			{
				title: "Artists",
				key: IdTitleKey.Artist,
				items: [
					{
						id: v4(),
						name: "Tony Mushah"
					}
				]
			}
		],
		links: [
			{
				title: "Read or Buy",
				items: [
					{
						href: "https://comic-walker.com",
						icon: writable(icon),
						title: "Comic Walker??"
					}
				]
			}
		],
		altTitles: [
			{
				locale: Language.English,
				title: "Special Eureka"
			}
		]
	}
};
