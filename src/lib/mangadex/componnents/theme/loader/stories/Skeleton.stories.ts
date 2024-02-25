import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import Skeleton from "../Skeleton.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/loader/Skeleton",
	component: Skeleton,
	tags: ["autodocs"]
} satisfies Meta<Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
