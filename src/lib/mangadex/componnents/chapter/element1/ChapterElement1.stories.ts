import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";
import testData from "./test-data.json";
import ChapterElement1 from "./ChapterElement1.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { Language } from "@mangadex/gql/graphql";
import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/chapter/elements/Element1",
	component: ChapterElement1,
	tags: ["autodocs"]
} satisfies Meta<ChapterElement1>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
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
				name: rel.attributes.username!
			}))[0],
		upload_date: new Date(testData.data.attributes.readableAt),
		download_state: ChapterDownloadState.Downloaded,
		comments: 124,
		haveBeenRead: false
	}
};
