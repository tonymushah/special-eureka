import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import MediumList, { type MediumMangaListElementProps } from "../MediumMangaList.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { volume7 } from "@mangadex/test-data/images/yuusha-party";
import { MangaStatus } from "@mangadex/gql/graphql";
import { readable } from "svelte/store";
import { range, random } from "lodash";
import { v4 } from "uuid";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/list/style/Medium",
	component: MediumList,
	tags: ["autodocs"]
} satisfies Meta<MediumList>;

export default meta;

type Story = StoryObj<typeof meta>;

const elementData = {
	coverImage: readable(volume7),
	coverImageAlt: "Yuusha Party volume7",
	status: MangaStatus.Ongoing,
	title: "Yuusha Party o Oida Sareta Kiyou Binbou sdasdsadasdad",
	description:
		"The Jack-Of-All-Trades Kicked Out of the Hero\u2019s Party: The Swordsman Who Became a Support Mage Due to Party Circumstances, Becomes All-Powerful"
};

export const Default: Story = {
	args: {
		list: range(random(2, 10, false)).map(() => ({
			...elementData,
			id: v4()
		}))
	}
};
