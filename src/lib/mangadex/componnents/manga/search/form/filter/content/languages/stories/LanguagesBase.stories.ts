import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import LanguagesBase from "../LanguagesBase.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { writable } from "svelte/store";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/search/Form/Dialog/Content/Languages/Base",
	component: LanguagesBase,
	tags: ["autodocs"]
} satisfies Meta<LanguagesBase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		selecteds: writable([]),
		title: "Some languages"
	}
};
