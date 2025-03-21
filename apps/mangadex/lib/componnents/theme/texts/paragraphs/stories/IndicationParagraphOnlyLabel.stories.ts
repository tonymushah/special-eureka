import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import IndicationParagraph from "./IndicationParagraphOnlyLabel.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/paragraphs/IndicationParagraphs",
	component: IndicationParagraph,
	tags: ["autodocs"],
	argTypes: {
		type: {
			type: {
				name: "enum",
				value: ["blue"]
			}
		}
	}
} satisfies Meta<IndicationParagraph>;

export default meta;

type Story = StoryObj<typeof meta>;

const innerText =
	"Reiciendis occaecati cum assumenda aut et ducimus repellendus. Fugit quibusdam id aut autem ut dolorem voluptas. Totam molestiae consequatur enim inventore quas.";

export const Blue: Story = {
	args: {
		type: "blue",
		innerText
	}
};
