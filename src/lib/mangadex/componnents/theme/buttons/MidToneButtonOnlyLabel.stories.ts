import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import MidToneButton from "./MidToneButtonOnlyLabel.svelte";
import MangadexThemeProviderForStory from "../MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/buttons/MidToneButton",
	component: MidToneButton,
	tags: ["autodocs"],
	argTypes: {
		style: {
			type: "string",
			name: "Style",
			description: "The button custom style"
		}
	}
} satisfies Meta<MidToneButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const label = "Button";

export const Default: Story = {
	args: {
		label
	}
};
