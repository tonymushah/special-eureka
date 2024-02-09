import type { Meta, StoryObj } from "@storybook/svelte";

import PrimaryButton from "./PrimaryButtonOnlyLabel.svelte";
import MangadexThemeProviderForStory from "../MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "PrimaryButton",
	component: PrimaryButton,
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
} satisfies Meta<PrimaryButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const label = "Button";

export const PrimaryDefault: Story = {
	args: {
		variant: "default",
		label
	}
};

export const PrimaryL1: Story = {
	args: {
		variant: "1",
		label
	}
};

export const PrimaryL2: Story = {
	args: {
		variant: "2",
		label
	}
};
