import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";
import testData from "@mangadex/componnents/chapter/base/element1/test-data.json";
import VolumeAccordion from "../VolumeAccordion.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { Language } from "@mangadex/gql/graphql";
import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
import { v4 } from "uuid";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/page/chapters/aggregate/VolumeAccordion",
	component: VolumeAccordion,
	tags: ["autodocs"]
} satisfies Meta<VolumeAccordion>;

export default meta;

type Story = StoryObj<typeof meta>;

const chap = {
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
		title: "Volume none",
		volumeContent: [
			{
				title: "Chapter 1",
				chapters: [{ ...chap, id: v4() }]
			},
			{
				title: "Chapter 2",
				chapters: [{ ...chap, id: v4() }]
			},
			{
				title: "Chapter 3",
				chapters: [
					{ ...chap, id: v4() },
					{ ...chap, id: v4() }
				]
			},
			{
				title: "Chapter 5",
				chapters: [{ ...chap, id: v4() }]
			},
			{
				title: "Chapter 6",
				chapters: [{ ...chap, id: v4() }]
			},
			{
				title: "Chapter 7",
				chapters: [
					{ ...chap, id: v4() },
					{ ...chap, id: v4() },
					{ ...chap, id: v4() },
					{ ...chap, id: v4() }
				]
			}
		]
	}
};
