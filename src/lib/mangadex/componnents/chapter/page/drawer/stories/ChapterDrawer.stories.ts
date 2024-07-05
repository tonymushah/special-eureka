import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import Drawer from "./ChapterDrawerForStories.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/chapter/page/Drawer",
	component: Drawer,
	tags: ["autodocs"]
} satisfies Meta<Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
