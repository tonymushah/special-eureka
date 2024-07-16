import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import Drawer from "./ChapterDrawerBaseForStories.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/chapter/page/drawer/Base",
	component: Drawer,
	tags: ["autodocs"]
} satisfies Meta<Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
