import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import CoverImage from "../CoverImage.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { writable } from "svelte/store";
import { fukkoi1 } from "@mangadex/test-data/images/fukkoi";
import { v4 } from "uuid";

const meta = {
    decorators: [() => MangadexThemeProviderForStory],
    title: "MangaDex/manga/page/covers/CoverImage",
    component: CoverImage,
    tags: ["autodocs"]
} satisfies Meta<CoverImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        coverImage: writable(fukkoi1),
        alt: v4(),
        title: "Volume 10"
    }
};
