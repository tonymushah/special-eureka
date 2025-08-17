import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import AltTitle from "../AltTitle.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { Language } from "@mangadex/gql/graphql";
import { writable } from "svelte/store";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/page/chapters/info/AltTitle",
	component: AltTitle,
	tags: ["autodocs"]
} satisfies Meta<AltTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Aitsu no Kanojo",
		locale: writable(Language.JapaneseRomanized)
	}
};
