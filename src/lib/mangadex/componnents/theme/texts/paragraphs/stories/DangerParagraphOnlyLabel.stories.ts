import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/index.css";

import DangerParagraph from "./DangerParagraphOnlyLabel.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/paragraphs/DangerParagraph",
	component: DangerParagraph,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			type: {
				name: "enum",
				value: ["default", "l1", "l2"]
			}
		}
	}
} satisfies Meta<DangerParagraph>;

export default meta;

type Story = StoryObj<typeof meta>;

const innerText =
	"Reiciendis occaecati cum assumenda aut et ducimus repellendus. Fugit quibusdam id aut autem ut dolorem voluptas. Totam molestiae consequatur enim inventore quas.";

export const DangerDefault: Story = {
	args: {
		variant: "default",
		innerText
	}
};

export const DangerL1: Story = {
	args: {
		variant: "l1",
		innerText
	}
};

export const DangerL2: Story = {
	args: {
		variant: "l2",
		innerText
	}
};
