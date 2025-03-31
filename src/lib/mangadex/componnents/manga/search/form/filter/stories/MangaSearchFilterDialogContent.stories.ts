import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import MangaDexFormDialogContent from "./MangaSearchFilterDialogContentForStoires.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
    decorators: [() => MangadexThemeProviderForStory],
    title: "MangaDex/manga/search/Form/Dialog/Content",
    component: MangaDexFormDialogContent,
    tags: ["autodocs"]
} satisfies Meta<MangaDexFormDialogContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
