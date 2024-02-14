import "@fontsource/poppins/latin.css";
import type { Meta, StoryObj } from "@storybook/svelte";

import { data3 } from "@mangadex/componnents/tag/testDatas";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { ContentRating, MangaStatus } from "@mangadex/gql/graphql";
import { honey_trap1 } from "@mangadex/test-data/images/honey-trap";
import MangaBase2 from "./MangaElementBase2.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/elements/Card2",
	component: MangaBase2,
	tags: ["autodocs"]
} satisfies Meta<MangaBase2>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		coverImage: honey_trap1,
		coverImageAlt: "Honey Trap Shared House volume 1",
		status: MangaStatus.Ongoing,
		title: "Honey Trap Shared House",
		description:
			"Amet numquam veniam magni repellat. Et nulla tempora placeat in omnis in. Fuga ut quos optio inventore alias delectus magni laboriosam voluptatem. Consequatur temporibus alias impedit voluptatem ducimus laudantium dolorem quo ut.",
		tags: data3.map((v) => ({
			id: v.id,
			name: v.attributes.name.en
		})),
		contentRating: ContentRating.Erotica
	}
};
