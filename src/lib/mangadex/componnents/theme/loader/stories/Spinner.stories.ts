import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import Spinner from "../Spinner.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/theme/loader/Spinner",
	component: Spinner,
	tags: ["autodocs"]
} satisfies Meta<Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
