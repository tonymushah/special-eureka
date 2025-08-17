import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import MidtoneLine from "./MangaSearchFormForStories.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/search/Form",
	component: MidtoneLine,
	tags: ["autodocs"]
} satisfies Meta<MidtoneLine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
