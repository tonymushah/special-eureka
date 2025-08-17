import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import YearForm from "./YearForStories.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/search/Form/Dialog/Content/Year",
	component: YearForm,
	tags: ["autodocs"]
} satisfies Meta<YearForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
