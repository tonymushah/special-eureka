import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import IndicationButton from "./IndicationButtonOnlyLabel.svelte";
import MangadexThemeProviderForStory from "../MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/buttons/IndicationButton",
	component: IndicationButton,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			type: {
				name: "enum",
				value: ["blue"]
			}
		},
		style: {
			type: "string",
			name: "Style",
			description: "The button custom style"
		}
	}
} satisfies Meta<IndicationButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const label = "Button";

export const Blue: Story = {
	args: {
		variant: "blue",
		label
	}
};
