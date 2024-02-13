import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/index.css";

import TagComponnents from "./TagComponnents.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { data3 } from "./testDatas";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/tag/TagComponnents",
	component: TagComponnents,
	tags: ["autodocs"]
} satisfies Meta<TagComponnents>;

export default meta;

type Story = StoryObj<typeof meta>;

const tags = data3.map((d) => ({
	id: d.id,
	name: d.attributes.name.en
}));

export const Default: Story = {
	args: {
		tags
	}
};
