import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/index.css";

import DangerButton from "./DangerButtonOnlyLabel.svelte";
import MangadexThemeProviderForStory from "../MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "DangerButton",
	component: DangerButton,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			type: {
				name: "enum",
				value: ["default", "1", "2"]
			}
		},
		style: {
			type: "string",
			name: "Style",
			description: "The button custom style"
		}
	}
} satisfies Meta<DangerButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const label = "Button";

export const DangerDefault: Story = {
	args: {
		variant: "default",
		label
	}
};

export const DangerL1: Story = {
	args: {
		variant: "1",
		label
	}
};

export const DangerL2: Story = {
	args: {
		variant: "2",
		label
	}
};
