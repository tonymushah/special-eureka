import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import TagModeForm from "./TagModeForStories.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
    decorators: [() => MangadexThemeProviderForStory],
    title: "MangaDex/manga/search/Form/Dialog/Content/TagMode",
    component: TagModeForm,
    tags: ["autodocs"]
} satisfies Meta<TagModeForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
