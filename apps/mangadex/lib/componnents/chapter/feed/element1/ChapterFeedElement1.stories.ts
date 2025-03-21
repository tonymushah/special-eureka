import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";
import testData from "../../base/element1/test-data.json";
import ChapterFeedElement1 from "./ChapterFeedElement1.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { Language } from "@mangadex/gql/graphql";
import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
import { fukkoi1 } from "@mangadex/test-data/images/fukkoi";
import { v4 } from "uuid";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/chapter/feed/elements/Element1",
	component: ChapterFeedElement1,
	tags: ["autodocs"]
} satisfies Meta<ChapterFeedElement1>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		mangaId: v4(),
		coverImage: fukkoi1,
		coverImageAlt: "fuufu-ijou-koibito-miman",
		mangaTitle: "Fuufu Ijou, Koibito Miman",
		chapterId: testData.data.id,
		chapterTitle: testData.data.attributes.title,
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
		download_state: ChapterDownloadState.Downloaded
	}
};
