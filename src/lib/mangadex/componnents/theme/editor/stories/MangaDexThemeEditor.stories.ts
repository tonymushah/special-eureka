import "@fontsource/poppins/latin.css";
import type { Meta, StoryObj } from "@storybook/sveltekit";

import MangadexThemeProviderForStory from "../../MangadexThemeProviderForStory.svelte";
import MangaDexThemeEditor from "../MangaDexThemeEditor.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/editor",
	component: MangaDexThemeEditor,
	tags: ["autodocs"]
} satisfies Meta<MangaDexThemeEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {}
};
