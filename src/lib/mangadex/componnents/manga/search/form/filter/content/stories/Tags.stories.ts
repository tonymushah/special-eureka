import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import TagsForm from "./TagsForStories.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/search/Form/Dialog/Content/Tags",
	component: TagsForm,
	tags: ["autodocs"]
} satisfies Meta<TagsForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
