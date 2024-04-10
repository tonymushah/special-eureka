import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import TitlePButton from "./TitlePButton.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { v4 } from "uuid";

enum TestStoryKey {
	Tag,
	Author,
	Artist
}

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/page/chapters/info/TitlePButton",
	component: TitlePButton,
	tags: ["autodocs"]
} satisfies Meta<TitlePButton<TestStoryKey>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Authors",
		key: TestStoryKey.Author,
		items: [
			{
				id: v4(),
				name: "Tony Mushah"
			},
			{
				id: v4(),
				name: "Hime"
			}
		]
	}
};
