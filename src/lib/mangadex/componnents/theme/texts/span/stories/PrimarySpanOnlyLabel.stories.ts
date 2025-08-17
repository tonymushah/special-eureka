import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import PrimarySpan from "./PrimarySpanOnlyLabel.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/spans/PrimarySpan",
	component: PrimarySpan,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			type: {
				name: "enum",
				value: ["default", "l1", "l2"]
			}
		}
	}
} satisfies Meta<PrimarySpan>;

export default meta;

type Story = StoryObj<typeof meta>;

const innerText =
	"Reiciendis occaecati cum assumenda aut et ducimus repellendus. Fugit quibusdam id aut autem ut dolorem voluptas. Totam molestiae consequatur enim inventore quas.";

export const PrimaryDefault: Story = {
	args: {
		variant: "default",
		innerText
	}
};

export const PrimaryL1: Story = {
	args: {
		variant: "l1",
		innerText
	}
};

export const PrimaryL2: Story = {
	args: {
		variant: "l2",
		innerText
	}
};
