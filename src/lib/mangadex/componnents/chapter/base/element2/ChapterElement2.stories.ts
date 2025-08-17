import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";
import testData from "../element1/test-data.json";
import ChapterElement2 from "./ChapterElement2.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { Language } from "@mangadex/gql/graphql";
import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
import { writable } from "svelte/store";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/chapter/elements/Element2",
	component: ChapterElement2,
	tags: ["autodocs"]
} satisfies Meta<ChapterElement2>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		id: testData.data.id,
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
		download_state: writable(ChapterDownloadState.Downloaded)
	}
};
