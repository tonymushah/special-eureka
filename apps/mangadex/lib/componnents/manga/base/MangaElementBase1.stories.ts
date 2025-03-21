import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import MangaBase1 from "./MangaElementBase1.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { volume7 } from "@mangadex/test-data/images/yuusha-party";
import { MangaStatus } from "@mangadex/gql/graphql";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/elements/Card1",
	component: MangaBase1,
	tags: ["autodocs"]
} satisfies Meta<MangaBase1>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		coverImage: volume7,
		coverImageAlt: "Yuusha Party volume7",
		status: MangaStatus.Ongoing,
		title: "Yuusha Party o Oida Sareta Kiyou Binbou sdasdsadasdad",
		description:
			"The Jack-Of-All-Trades Kicked Out of the Hero\u2019s Party: The Swordsman Who Became a Support Mage Due to Party Circumstances, Becomes All-Powerful"
	}
};
