import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import MidtoneLine from "./MidToneLine.svelte";
import MangadexThemeProviderForStory from "../MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/lines/MidToneLine",
	component: MidtoneLine,
	tags: ["autodocs"]
} satisfies Meta<MidtoneLine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
