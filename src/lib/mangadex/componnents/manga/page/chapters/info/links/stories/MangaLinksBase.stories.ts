import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import icon from "../images/favicon.ico";
import MangaLinksBase from "../MangaLinksBase.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { writable } from "svelte/store";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/page/chapters/info/MangaLinksBase",
	component: MangaLinksBase,
	tags: ["autodocs"]
} satisfies Meta<MangaLinksBase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Read or Buy",
		items: [
			{
				href: "https://comic-walker.com",
				title: "Official Raw",
				icon: writable(icon)
			}
		]
	}
};
