import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import MangaPageCovers from "../MangaPageCovers.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { writable } from "svelte/store";
import { v4 } from "uuid";
import { volume1, volume3, volume5 } from "@mangadex/test-data/images/uncategorized-1";
import { Variant } from "../MangaPageCovers.utils";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/page/covers/Covers",
	component: MangaPageCovers,
	tags: ["autodocs"]
} satisfies Meta<MangaPageCovers>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = [
	{
		coverImage: writable(volume1),
		title: "Volume 1",
		alt: v4()
	},
	{
		coverImage: writable(undefined),
		title: "Volume 2",
		alt: v4()
	},
	{
		coverImage: writable(volume3),
		title: "Volume 3",
		alt: v4()
	},
	{
		coverImage: writable(undefined),
		title: "Volume 4",
		alt: v4()
	},
	{
		coverImage: writable(volume5),
		title: "Volume 5",
		alt: v4()
	}
];

export const Default: Story = {
	args: {
		items,
		variant: Variant.None
	}
};

export const Flex: Story = {
	args: {
		items,
		variant: Variant.Flex
	}
};

export const Grid: Story = {
	args: {
		items,
		variant: Variant.Grid
	}
};
