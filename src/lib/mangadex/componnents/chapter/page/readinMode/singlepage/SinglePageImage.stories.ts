import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import SinglePageImage from "./SinglePageImage.svelte";
import fuufuIjouChapter56 from "../tests/bee8582d-dbed-4075-be3d-4361052d31c1/images";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/chapter/readingMode/singlePage/Image",
	component: SinglePageImage,
	tags: ["autodocs"]
} satisfies Meta<SinglePageImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		src: fuufuIjouChapter56[0],
		alt: fuufuIjouChapter56[0]
	}
};
