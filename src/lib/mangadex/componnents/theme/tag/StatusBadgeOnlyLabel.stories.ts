import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import StatusBadge from "./StatusBadgeOnlyLabel.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/tag/StatusBadge",
	component: StatusBadge,
	tags: ["autodocs"],
	argTypes: {
		color: {
			type: {
				name: "enum",
				value: ["red", "green", "yellow", "blue", "gray", "purple"]
			}
		}
	}
} satisfies Meta<StatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

const label = "Tag";
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
