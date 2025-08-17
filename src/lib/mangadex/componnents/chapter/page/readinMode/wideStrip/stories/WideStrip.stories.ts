import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import Page from "./WideStripForStories.svelte";
import fuufuIjouChapter56 from "../../tests/bee8582d-dbed-4075-be3d-4361052d31c1/images";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/chapter/readingMode/WideStrip",
	component: Page,
	tags: ["autodocs"]
} satisfies Meta<Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		images: fuufuIjouChapter56
	}
};
