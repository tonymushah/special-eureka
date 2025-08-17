import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";
import ContextMenuBase from "../ContextMenuBase.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import NewWindowIcon from "./NewWindowIcon.svelte";
import PreviousIcon from "./PreviousIcon.svelte";
import { HomeIcon } from "svelte-feather-icons";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/context-menu/MenuBase",
	component: ContextMenuBase,
	tags: ["autodocs"]
} satisfies Meta<ContextMenuBase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		items: [
			{
				icon: PreviousIcon,
				label: "Previous"
			},
			{
				icon: NewWindowIcon,
				label: "New Window"
			},
			{
				icon: HomeIcon,
				label: "ToHome"
			}
		],
		tabindex: 0
	}
};
