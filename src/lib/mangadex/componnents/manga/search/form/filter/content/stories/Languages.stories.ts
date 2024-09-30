import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import LanguagesForm from "./LanguagesForStories.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
    decorators: [() => MangadexThemeProviderForStory],
    title: "MangaDex/manga/search/Form/Dialog/Content/Languages",
    component: LanguagesForm,
    tags: ["autodocs"]
} satisfies Meta<LanguagesForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
