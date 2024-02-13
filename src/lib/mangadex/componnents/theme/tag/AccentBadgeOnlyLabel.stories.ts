import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/index.css";

import AccentBadge from "./AccentBadgeOnlyLabel.svelte";
import MangadexThemeProviderForStory from "../MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/tag/AccentBadge",
	component: AccentBadge,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			type: {
				name: "enum",
				value: ["default", "1", "2", "3", "4", "5"]
			}
		}
	}
} satisfies Meta<AccentBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

const label = "Tag";

export const AccentDefault: Story = {
	args: {
		variant: "default",
		label
	}
};

export const AccentL1: Story = {
	args: {
		variant: "1",
		label
	}
};

export const AccentL2: Story = {
	args: {
		variant: "2",
		label
	}
};

export const AccentL3: Story = {
	args: {
		variant: "3",
		label
	}
};

export const AccentL4: Story = {
	args: {
		variant: "4",
		label
	}
};

export const AccentL5: Story = {
	args: {
		variant: "5",
		label
	}
};

export const Accent: Story = {
	args: {
		variant: "accent",
		label
	}
};

export const AccentAlt: Story = {
	args: {
		variant: "accent-alt",
		label
	}
};
