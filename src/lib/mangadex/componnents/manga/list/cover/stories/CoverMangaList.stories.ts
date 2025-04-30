import "@fontsource/poppins/latin.css";
import type { Meta, StoryObj } from "@storybook/svelte";

import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { fukkoi1 } from "@mangadex/test-data/images/fukkoi";
import List from "../CoverMangaList.svelte";
import { readable } from "svelte/store";
import { random, range } from "lodash";
import { v4 } from "uuid";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/list/style/Cover",
	component: List,
	tags: ["autodocs"]
} satisfies Meta<List>;

export default meta;

type Story = StoryObj<typeof meta>;

const item_data = {
	coverImage: readable(fukkoi1),
	coverImageAlt: "fuufu-ijou-koibito-miman",
	title: "Fuufu Ijou, Koibito Miman"
};

export const Default: Story = {
	args: {
		list: range(random(2, 10, false)).map(() => ({
			...item_data,
			id: v4()
		}))
	}
};
