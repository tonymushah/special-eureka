import type { Meta, StoryObj } from "@storybook/sveltekit";
import "@fontsource/poppins/latin.css";

import TagComponnentsFlex from "./TagComponnentsFlex.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { data3 } from "./testDatas";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/tag/TagComponnentsFlex",
	component: TagComponnentsFlex,
	tags: ["autodocs"]
} satisfies Meta<TagComponnentsFlex>;

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
