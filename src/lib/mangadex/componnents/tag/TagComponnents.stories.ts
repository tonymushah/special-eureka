import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/index.css";

import TagComponnents from "./TagComponnents.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/tag/TagComponnents",
	component: TagComponnents,
	tags: ["autodocs"]
} satisfies Meta<TagComponnents>;

export default meta;

type Story = StoryObj<typeof meta>;

const data = [
	{
		id: "423e2eae-a7a2-4a8b-ac03-a8351462d71d",
		type: "tag",
		attributes: { name: { en: "Romance" }, description: {}, group: "genre", version: 1 },
		relationships: []
	},
	{
		id: "4d32cc48-9f00-4cca-9b5a-a839f0764984",
		type: "tag",
		attributes: { name: { en: "Comedy" }, description: {}, group: "genre", version: 1 },
		relationships: []
	},
	{
		id: "5bd0e105-4481-44ca-b6e7-7544da56b1a3",
		type: "tag",
		attributes: { name: { en: "Incest" }, description: {}, group: "theme", version: 1 },
		relationships: []
	},
	{
		id: "caaa44eb-cd40-4177-b930-79d3ef2afe87",
		type: "tag",
		attributes: {
			name: { en: "School Life" },
			description: {},
			group: "theme",
			version: 1
		},
		relationships: []
	},
	{
		id: "f4122d1c-3b44-44d0-9936-ff7502c39ad3",
		type: "tag",
		attributes: {
			name: { en: "Adaptation" },
			description: {},
			group: "format",
			version: 1
		},
		relationships: []
	}
];
const tags = data.map((d) => ({
	id: d.id,
	name: d.attributes.name.en
}));

export const Default: Story = {
	args: {
		tags
	}
};
