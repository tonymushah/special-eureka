import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import Page from "./ChapterPageForStories.svelte";
import { data } from "../readinMode/tests/bee8582d-dbed-4075-be3d-4361052d31c1/data.json";
import {
	CurrentChapterData,
	CurrentChapterGroup,
	CurrentChapterThread,
	CurrentChapterTitle,
	CurrentChapterUploader
} from "../contexts/currentChapter";
import fuufuIjouChapter56 from "../readinMode/tests/bee8582d-dbed-4075-be3d-4361052d31c1/images";
import aggregate from "../readinMode/tests/bee8582d-dbed-4075-be3d-4361052d31c1/aggregate";
import { Language, UserRole } from "@mangadex/gql/graphql";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/chapter/Page",
	component: Page,
	tags: ["autodocs"]
} satisfies Meta<Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		chapter: new CurrentChapterData({
			id: data.id,
			volume: data.attributes.volume,
			title: data.attributes.title ?? undefined,
			chapterNumber: data.attributes.chapter,
			uploader: new CurrentChapterUploader({
				name: data.relationships[2].attributes.username ?? "",
				id: data.relationships[2].id,
				roles: [UserRole.RoleGroupMember, UserRole.RoleMember, UserRole.RoleGroupLeader]
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
			thread: new CurrentChapterThread({
				threadUrl: "https://forums.mangadex.org/threads/1072794",
				comments: 45
			}),
			translatedLanguage: Language.English
		}),
		currentPage: 0,
		images: fuufuIjouChapter56,
		relatedChapters: aggregate.toReversed()
	}
};
