import "@fontsource/poppins/latin.css";
import type { Meta, StoryObj } from "@storybook/svelte";

import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import MangaBase5 from "./ChapterFeedElement3.svelte";
import { v4 } from "uuid";
import testData from "../../base/element1/test-data.json";
import { Language } from "@mangadex/gql/graphql";
import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/chapter/feed/elements/Element3",
	component: MangaBase5,
	tags: ["autodocs"]
} satisfies Meta<MangaBase5>;

export default meta;

type Story = StoryObj<typeof meta>;

const testChapter = {
	chapterId: v4(),
	title: testData.data.attributes.title,
	lang: Language.English,
	groups: testData.data.relationships
		.filter((rel) => rel.type == "scanlation_group")
		.map((rel) => ({
			id: rel.id,
			name: rel.attributes.name
		})),
	uploader: testData.data.relationships
		.filter((rel) => rel.type == "user")
		.map((rel) => ({
			id: rel.id,
			name: rel.attributes.username!,
			roles: []
		}))[0],
	upload_date: new Date(testData.data.attributes.readableAt),
	download_state: ChapterDownloadState.Downloaded,
	comments: 124,
	haveBeenRead: false
};

export const Default: Story = {
	args: {
		mangaId: v4(),
		title: "Fuufu Ijou, Koibito Miman",
		chapters: [
			testChapter,
			testChapter,
			testChapter,
			testChapter,
			testChapter,
			testChapter,
			testChapter
		]
	}
};
