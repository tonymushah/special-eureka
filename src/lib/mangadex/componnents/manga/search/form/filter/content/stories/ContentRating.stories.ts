import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import ContentRatingForm from "./ContentRatingForStories.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/search/Form/Dialog/Content/Rating",
	component: ContentRatingForm,
	tags: ["autodocs"]
} satisfies Meta<ContentRatingForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
