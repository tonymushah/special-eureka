import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/index.css";

import DefaultParagraph from "./DefaultParagraphOnlyLabel.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "DefaultParagraph",
	component: DefaultParagraph,
	tags: ["autodocs"]
} satisfies Meta<DefaultParagraph>;

export default meta;

type Story = StoryObj<typeof meta>;

const innerText =
	"Reiciendis occaecati cum assumenda aut et ducimus repellendus. Fugit quibusdam id aut autem ut dolorem voluptas. Totam molestiae consequatur enim inventore quas.";

export const Default: Story = {
	args: {
		innerText
	}
};
