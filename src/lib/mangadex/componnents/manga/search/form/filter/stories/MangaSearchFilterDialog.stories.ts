import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import MangaDexFormDialog from "./MangaSearchFilterDialogForStories.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/search/Form/Dialog",
	component: MangaDexFormDialog,
	tags: ["autodocs"]
} satisfies Meta<MangaDexFormDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RequireValidation: Story = {
	args: {
		requireValidation: true
	}
};
