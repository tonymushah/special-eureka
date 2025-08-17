import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import StatusButton from "./StatusButtonOnlyLabel.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/buttons/StatusButton",
	component: StatusButton,
	tags: ["autodocs"],
	argTypes: {
		color: {
			type: {
				name: "enum",
				value: ["red", "green", "yellow", "blue", "gray", "purple"]
			}
		}
	}
} satisfies Meta<StatusButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const label = "Button";
export const Red: Story = {
	args: {
		color: "red",
		label
	}
};

export const Green: Story = {
	args: {
		color: "green",
		label
	}
};

export const Yellow: Story = {
	args: {
		color: "yellow",
		label
	}
};

export const Blue: Story = {
	args: {
		color: "blue",
		label
	}
};

export const Gray: Story = {
	args: {
		color: "gray",
		label
	}
};

export const Purple: Story = {
	args: {
		color: "purple",
		label
	}
};
