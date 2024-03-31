import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import MangaPageCovers from "../MangaPageCovers.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
    decorators: [() => MangadexThemeProviderForStory],
    title: "MangaDex/manga/page/covers/Covers",
    component: MangaPageCovers,
    tags: ["autodocs"]
} satisfies Meta<MangaPageCovers>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {

};
