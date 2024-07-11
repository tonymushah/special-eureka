import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import Page from "./ChapterReadingModeForStories.svelte";
import images from "../tests/bee8582d-dbed-4075-be3d-4361052d31c1/images";
import { ReadingMode } from "@mangadex/gql/graphql";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/chapter/page/ReadingMode",
	component: Page,
	tags: ["autodocs"]
} satisfies Meta<Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DoublePage: Story = {
	args: {
		images,
		readingMode: ReadingMode.DoublePage
	}
};

export const LongStrip: Story = {
	args: {
		images,
		readingMode: ReadingMode.LongStrip
	}
};

export const SinglePage: Story = {
	args: {
		images,
		readingMode: ReadingMode.SinglePage
	}
};

export const WideStrip: Story = {
	args: {
		images,
		readingMode: ReadingMode.WideStrip
	}
};
