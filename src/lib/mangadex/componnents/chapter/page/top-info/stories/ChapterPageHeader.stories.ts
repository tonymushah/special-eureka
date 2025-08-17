import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import Header from "./ChapterPageHeaderForStories.svelte";
import { data } from "../../readinMode/tests/bee8582d-dbed-4075-be3d-4361052d31c1/data.json";
import {
	CurrentChapterData,
	CurrentChapterGroup,
	CurrentChapterTitle,
	CurrentChapterUploader
} from "../../contexts/currentChapter";
import { Language } from "@mangadex/gql/graphql";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/chapter/page/Header",
	component: Header,
	tags: ["autodocs"]
} satisfies Meta<Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		currentChapter: new CurrentChapterData({
			id: data.id,
			volume: data.attributes.volume,
			title: data.attributes.title ?? undefined,
			chapterNumber: data.attributes.chapter,
			uploader: new CurrentChapterUploader({
				name: data.relationships[2].attributes.username ?? "",
				id: data.relationships[2].id
			}),
			groups: [
				new CurrentChapterGroup({
					name: data.relationships[0].attributes.name ?? "",
					id: data.relationships[0].id
				})
			],
			series: new CurrentChapterTitle({
				id: data.relationships[1].id,
				title: data.relationships[1].attributes.title?.en ?? ""
			}),
			translatedLanguage: Language.English
		})
	}
};
