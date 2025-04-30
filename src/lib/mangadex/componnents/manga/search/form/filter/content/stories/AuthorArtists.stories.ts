import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import AuthorArtistsForm from "./AuthorArtistsForStories.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/search/Form/Dialog/Content/AuthorArtists",
	component: AuthorArtistsForm,
	tags: ["autodocs"]
} satisfies Meta<AuthorArtistsForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
