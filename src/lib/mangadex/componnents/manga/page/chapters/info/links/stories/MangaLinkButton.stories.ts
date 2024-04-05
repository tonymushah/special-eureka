import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import icon from "../images/favicon.ico";
import MangaLinkButton from "../MangaLinkButton.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { writable } from "svelte/store";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/page/chapters/MangaLinkButton",
	component: MangaLinkButton,
	tags: ["autodocs"]
} satisfies Meta<MangaLinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		href: "https://comic-walker.com",
		title: "Official Raw",
		icon: writable(icon)
	}
};
