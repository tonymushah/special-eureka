import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import CategorizedTitles from "../CategorizedTitles.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { volume7 } from "@mangadex/test-data/images/yuusha-party";
import { MangaStatus } from "@mangadex/gql/graphql";
import { writable } from "svelte/store";
import { v4 } from "uuid";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/page/related/CategoryBase",
	component: CategorizedTitles,
	tags: ["autodocs"]
} satisfies Meta<CategorizedTitles>;

export default meta;

type Story = StoryObj<typeof meta>;

const testTitle = {
	coverImage: writable(volume7),
	coverImageAlt: "Yuusha Party volume7",
	status: MangaStatus.Ongoing,
	title: "Yuusha Party o Oida Sareta Kiyou Binbou sdasdsadasdad",
	description:
		"The Jack-Of-All-Trades Kicked Out of the Hero\u2019s Party: The Swordsman Who Became a Support Mage Due to Party Circumstances, Becomes All-Powerful"
};

export const Default: Story = {
	args: {
		title: "Prequel",
		titles: Array.from({ length: Math.floor(Math.random() * 10) }, () => v4()).map((id) => ({
			...testTitle,
			id
		}))
	}
};
