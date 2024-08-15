import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import ListSelect from "./MangaListTabSelectForStories.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
    decorators: [() => MangadexThemeProviderForStory],
    title: "MangaDex/manga/list/Select",
    component: ListSelect,
    tags: ["autodocs"]
} satisfies Meta<ListSelect>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
};
