import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import ListSelect from "./ChapterFeedListSelector.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { writable } from "svelte/store";
import { ChapterFeedStyle } from "@mangadex/gql/graphql";

const meta = {
    decorators: [() => MangadexThemeProviderForStory],
    title: "MangaDex/chapter/feed/list/misc/Select",
    component: ListSelect,
    tags: ["autodocs"]
} satisfies Meta<ListSelect>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        style: writable(ChapterFeedStyle.CoverLess)
    }
};
