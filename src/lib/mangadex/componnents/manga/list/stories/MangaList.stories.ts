import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import List from "./MangaListForStories.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { volume7 } from "@mangadex/test-data/images/yuusha-party";
import { ContentRating, MangaStatus } from "@mangadex/gql/graphql";
import { readable } from "svelte/store";
import { range, random } from "lodash";
import { v4 } from "uuid";
import { honey_trap1 } from "@mangadex/test-data/images/honey-trap";
import { data3 } from "@mangadex/componnents/tag/testDatas";
import { fukkoi1 } from "@mangadex/test-data/images/fukkoi";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/list",
	component: List,
	tags: ["autodocs"]
} satisfies Meta<List>;

export default meta;

type Story = StoryObj<typeof meta>;

const elementsData = [
	{
		coverImage: readable(honey_trap1),
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
	},
	{
		coverImage: readable(volume7),
		coverImageAlt: "Yuusha Party volume7",
		status: MangaStatus.Ongoing,
		title: "Yuusha Party o Oida Sareta Kiyou Binbou sdasdsadasdad",
		description:
			"The Jack-Of-All-Trades Kicked Out of the Hero\u2019s Party: The Swordsman Who Became a Support Mage Due to Party Circumstances, Becomes All-Powerful",
		tags: [
			{
				id: v4(),
				name: "Fantasy"
			},
			{
				id: v4(),
				name: "Action"
			},
			{
				id: v4(),
				name: "Harem"
			}
		]
	},
	{
		coverImage: readable(fukkoi1),
		coverImageAlt: "fuufu-ijou-koibito-miman",
		title: "Fuufu Ijou, Koibito Miman",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut, commodi quibusdam ipsam aspernatur maxime molestiae, dolorum ducimus ipsa corporis, optio eaque! Quidem rerum quod velit asperiores dolorem quisquam in!",
		tags: [
			{
				id: v4(),
				name: "Romance"
			},
			{
				id: v4(),
				name: "School Life"
			},
			{
				id: v4(),
				name: "Drama"
			}
		],
		status: MangaStatus.Ongoing,
		contentRating: ContentRating.Suggestive
	}
];

export const Default: Story = {
	args: {
		list: range(random(2, 10, false)).map(() => {
			const elementData = elementsData[random(10) % 3];
			return {
				...elementData,
				id: v4()
			};
		})
	}
};
