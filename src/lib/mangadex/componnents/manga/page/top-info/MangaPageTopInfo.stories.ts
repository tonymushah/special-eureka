import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import TopInfo from "./MangaPageTopInfo.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { volume7 } from "@mangadex/test-data/images/yuusha-party";
import { MangaStatus } from "@mangadex/gql/graphql";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/page/TopInfo",
	component: TopInfo,
	tags: ["autodocs"]
} satisfies Meta<TopInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {}
};
