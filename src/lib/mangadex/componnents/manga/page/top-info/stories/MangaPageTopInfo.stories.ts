import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import TopInfo from "../MangaPageTopInfo.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { fukkoi1 } from "@mangadex/test-data/images/fukkoi";
import { id, attributes, author } from "./data/b4c93297-b32f-4f90-b619-55456a38b0aa";
import manga_altTitle_to_lang_map from "@mangadex/utils/lang/record-to-map/manga-altTitle-to-lang-map";
import get_value_and_random_if_undefined from "@mangadex/utils/lang/get_value_and_random_if_undefined";
import { writable } from "svelte/store";
import { MangaStatus } from "@mangadex/gql/graphql";

const altTitle = manga_altTitle_to_lang_map(attributes.altTitles);

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/page/TopInfo",
	component: TopInfo,
	tags: ["autodocs"]
} satisfies Meta<TopInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		id,
		title: attributes.title.en,
		altTitle: get_value_and_random_if_undefined(altTitle, "en"),
		coverImage: writable(fukkoi1),
		coverImageAlt: fukkoi1,
		authors: [
			{
				id: author.id,
				name: author.attributes.name
			}
		],
		tags: attributes.tags.map((t) => ({
			id: t.id,
			name: t.attributes.name.en
		})),
		status: MangaStatus.Ongoing,
		description: attributes.description.en
	}
};
