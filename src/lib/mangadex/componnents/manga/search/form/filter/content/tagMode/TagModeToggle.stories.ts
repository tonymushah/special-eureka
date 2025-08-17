import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import TagModeToggle from "./TagModeToggle.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { writable } from "svelte/store";
import { TagSearchMode } from "@mangadex/gql/graphql";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/search/Form/Dialog/Content/TagMode/Toggle",
	component: TagModeToggle,
	tags: ["autodocs"]
} satisfies Meta<TagModeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		writableTag: writable(TagSearchMode.And)
	}
};
