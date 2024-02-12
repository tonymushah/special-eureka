import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/index.css";

import StatusSpan from "./StatusSpanOnlyLabel.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/spans/StatusSpan",
	component: StatusSpan,
	tags: ["autodocs"],
	argTypes: {
		type: {
			type: {
				name: "enum",
				value: ["red", "green", "yellow", "blue", "gray", "purple"]
			}
		}
	}
} satisfies Meta<StatusSpan>;

export default meta;

type Story = StoryObj<typeof meta>;

const innerText =
	"Reiciendis occaecati cum assumenda aut et ducimus repellendus. Fugit quibusdam id aut autem ut dolorem voluptas. Totam molestiae consequatur enim inventore quas.";

export const Red: Story = {
	args: {
		type: "red",
		innerText
	}
};

export const Green: Story = {
	args: {
		type: "green",
		innerText
	}
};

export const Yellow: Story = {
	args: {
		type: "yellow",
		innerText
	}
};

export const Blue: Story = {
	args: {
		type: "blue",
		innerText
	}
};

export const Gray: Story = {
	args: {
		type: "gray",
		innerText
	}
};

export const Purple: Story = {
	args: {
		type: "purple",
		innerText
	}
};
