import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import Comments from "./CommentsButton.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/page/top-info/stats/Comments",
	component: Comments,
	tags: ["autodocs"]
} satisfies Meta<Comments>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		comments: 125
	}
};
