import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import Accordion from "./AccordionWithStories.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/Accordion",
	component: Accordion,
	tags: ["autodocs"]
} satisfies Meta<Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBorder: Story = {
	args: {
		withBorder: true
	}
};

export const TitleBorder: Story = {
	args: {
		titleBorder: true
	}
};
