import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";
import ContextMenuItem from "../ContextMenuItem.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import NewWindowIcon from "./NewWindowIcon.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/context-menu/MenuItem",
	component: ContextMenuItem,
	tags: ["autodocs"]
} satisfies Meta<ContextMenuItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		icon: NewWindowIcon,
		label: "New window",
		tabindex: 0
	}
};
