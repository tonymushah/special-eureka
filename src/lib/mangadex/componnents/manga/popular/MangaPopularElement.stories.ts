import "@fontsource/poppins/latin.css";
import type { Meta, StoryObj } from "@storybook/sveltekit";

import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { ContentRating } from "@mangadex/gql/graphql";
import { volume1 } from "@mangadex/test-data/images/uncategorized-1";
import MangaPopularElement from "./MangaPopularElement.svelte";
import { v4 } from "uuid";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/elements/PopularElement",
	component: () => MangaPopularElement,
	tags: ["autodocs"]
} satisfies Meta<MangaPopularElement>;

export default meta;

type Story = StoryObj<typeof meta>;

const data = [
	{
		id: "391b0423-d847-456f-aff0-8b0cfc03066b",
		type: "tag",
		attributes: {
			name: { en: "Action" },
			description: {},
			group: "genre",
			version: 1
		},
		relationships: []
	},
	{
		id: "39730448-9a5f-48a2-85b0-a70db87b1233",
		type: "tag",
		attributes: {
			name: { en: "Demons" },
			description: {},
			group: "theme",
			version: 1
		},
		relationships: []
	},
	{
		id: "423e2eae-a7a2-4a8b-ac03-a8351462d71d",
		type: "tag",
		attributes: {
			name: { en: "Romance" },
			description: {},
			group: "genre",
			version: 1
		},
		relationships: []
	},
	{
		id: "87cc87cd-a395-47af-b27a-93258283bbc6",
		type: "tag",
		attributes: {
			name: { en: "Adventure" },
			description: {},
			group: "genre",
			version: 1
		},
		relationships: []
	},
	{
		id: "b9af3a63-f058-46de-a9a0-e0c13906197a",
		type: "tag",
		attributes: {
			name: { en: "Drama" },
			description: {},
			group: "genre",
			version: 1
		},
		relationships: []
	},
	{
		id: "cdc58593-87dd-415e-bbc0-2ec27bf404cc",
		type: "tag",
		attributes: {
			name: { en: "Fantasy" },
			description: {},
			group: "genre",
			version: 1
		},
		relationships: []
	},
	{
		id: "e5301a23-ebd9-49dd-a0cb-2add944c7fe9",
		type: "tag",
		attributes: {
			name: { en: "Slice of Life" },
			description: {},
			group: "genre",
			version: 1
		},
		relationships: []
	},
	{
		id: "ea2bc92d-1c26-4930-9b7c-d5c0dc1b6869",
		type: "tag",
		attributes: {
			name: { en: "Cooking" },
			description: {},
			group: "theme",
			version: 1
		},
		relationships: []
	},
	{
		id: "f4122d1c-3b44-44d0-9936-ff7502c39ad3",
		type: "tag",
		attributes: {
			name: { en: "Adaptation" },
			description: {},
			group: "format",
			version: 1
		},
		relationships: []
	}
];

const authors = [
	{
		id: "e1aad006-bff4-438a-9e61-1945b9889114",
		type: "author",
		attributes: {
			name: "CHIROLU",
			imageUrl: null,
			biography: {},
			twitter: null,
			pixiv: null,
			melonBook: null,
			fanBox: null,
			booth: null,
			nicoVideo: null,
			skeb: null,
			fantia: null,
			tumblr: null,
			youtube: null,
			weibo: null,
			naver: null,
			website: null,
			createdAt: "2021-04-19T21:59:45+00:00",
			updatedAt: "2021-04-19T21:59:45+00:00",
			version: 1
		}
	},
	{
		id: "034b9d81-4114-4e45-bb52-08722ad49a5e",
		type: "artist",
		attributes: {
			name: "Hota.",
			imageUrl: null,
			biography: {
				en: "**Circles**:\nHaruka Yumemikan. (\u306f\u308b\u304b\u3086\u3081\u307f\u304b\u3093\u3002)\nIyokan Mizutataki. (\u3044\u3088\u304b\u3093\u307f\u305a\u305f\u305f\u304d\u3002)\nIyokan. (\u3044\u3088\u304b\u3093\u3002)\nKabosu. (\u304b\u307c\u3059\u3002)\nSansei Iyokan. (\u9178\u6027\u3044\u3088\u304b\u3093\u3002)\nShimen Soka (\u56db\u9762\u695a\u6b4c)\nYume Mikan. (\u3086\u3081\u307f\u304b\u3093\u3002)"
			},
			twitter: "https://twitter.com/hotaiyokan",
			pixiv: "https://www.pixiv.net/users/3309",
			melonBook: null,
			fanBox: "https://hota.fanbox.cc/",
			booth: null,
			nicoVideo: null,
			skeb: "https://skeb.jp/@hotaiyokan",
			fantia: null,
			tumblr: null,
			youtube: null,
			weibo: null,
			naver: null,
			website: "http://hotaiyokan.blog86.fc2.com/",
			createdAt: "2021-04-19T21:59:45+00:00",
			updatedAt: "2022-04-09T12:36:01+00:00",
			version: 3
		}
	}
];

export const Default: Story = {
	args: {
		coverImage: volume1,
		coverImageAlt: "556239d8-7bb0-4e22-bf7b-48a4e35478d7",
		title: "Uchi no Ko no Tame naraba, Ore wa Moshikashitara Maou mo Taoseru kamo Shirenai",
		description:
			"He met a girl. A young girl branded with the mark of a criminal. That was the beginning of everything. \u0022Crap, my girl\u0027s so cute\u0022 This is the story of the two who became an overly protective guardian and an adopted child, changing relationships, and furthermore until how that relationship evolves.  \n  \nAdapted from the Light Novel series of the same name.  \n\n\n---",
		tags: data.map((v) => ({
			id: v.id,
			name: v.attributes.name.en
		})),
		contentRating: ContentRating.Suggestive,
		authors: authors.map((a) => ({
			id: a.id,
			name: a.attributes.name
		})),
		mangaId: v4()
	}
};
