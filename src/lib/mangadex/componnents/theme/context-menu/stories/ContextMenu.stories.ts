import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";
import ContextMenu from "./ContextMenuForStories.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/context-menu/ContextMenu",
	component: ContextMenu,
	tags: ["autodocs"]
} satisfies Meta<ContextMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
