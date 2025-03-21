import "@fontsource/poppins/latin.css";
import type { Meta, StoryObj } from "@storybook/svelte";

import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { fukkoi1 } from "@mangadex/test-data/images/fukkoi";
import MangaBase4 from "./MangaElementBase4.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/elements/Card4",
	component: MangaBase4,
	tags: ["autodocs"]
} satisfies Meta<MangaBase4>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		coverImage: fukkoi1,
		coverImageAlt: "fuufu-ijou-koibito-miman",
		title: "Fuufu Ijou, Koibito Miman"
	}
};
