import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import IndicationBadge from "./IndicationOnlyLabel.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/tag/IndicationBadge",
	component: IndicationBadge,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			type: {
				name: "enum",
				value: ["blue"]
			}
		}
	}
} satisfies Meta<IndicationBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

const label = "Tag";

export const Blue: Story = {
	args: {
		variant: "blue",
		label
	}
};
