import "@fontsource/poppins/latin.css";
import type { Meta, StoryObj } from "@storybook/svelte";

import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { fukkoi1 } from "@mangadex/test-data/images/fukkoi";
import MangaBase3 from "./MangaElementBase3.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/elements/Card3",
	component: MangaBase3,
	tags: ["autodocs"]
} satisfies Meta<MangaBase3>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		coverImage: fukkoi1,
		coverImageAlt: "fuufu-ijou-koibito-miman",
		title: "Fuufu Ijou, Koibito Miman"
	}
};
