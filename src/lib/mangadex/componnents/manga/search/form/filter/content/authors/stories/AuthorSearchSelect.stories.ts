import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import AuthorSearchBaseForm from "./AuthorSearchSelectForStories.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/search/Form/Dialog/Content/AuthorArtists/Search/Base",
	component: AuthorSearchBaseForm,
	tags: ["autodocs"]
} satisfies Meta<AuthorSearchBaseForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
