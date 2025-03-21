import "@fontsource/poppins/latin.css";
import type { Meta, StoryObj } from "@storybook/svelte";

import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { fukkoi1 } from "@mangadex/test-data/images/fukkoi";
import MangaBase5 from "./MangaElementBase5.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/elements/Card5",
	component: MangaBase5,
	tags: ["autodocs"]
} satisfies Meta<MangaBase5>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		coverImage: fukkoi1,
		coverImageAlt: "fuufu-ijou-koibito-miman",
		title: "Fuufu Ijou, Koibito Miman",
		description:
			"Jirou, a third-year in high school, is forced to live with a gyaru named Akari under a course called the \u0022Couple Practical\u0022. In order to be paired with their own romantic interests, they\u0027re going to act as a married couple\u2026!?"
	}
};
