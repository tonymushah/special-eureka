import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import DangerBadge from "./DangerBadgeOnlyLabel.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/tag/DangerBadge",
	component: DangerBadge,
	tags: ["autodocs"],
	argTypes: {
		type: {
			type: {
				name: "enum",
				value: ["default", "l1", "l2"]
			}
		}
	}
} satisfies Meta<DangerBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

const label = "Tag";

export const Default: Story = {
	args: {
		type: "default",
		label
	}
};

export const L1: Story = {
	args: {
		type: "l1",
		label
	}
};

export const L2: Story = {
	args: {
		type: "l2",
		label
	}
};
