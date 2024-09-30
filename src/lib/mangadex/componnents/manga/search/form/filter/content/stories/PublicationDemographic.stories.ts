import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import PublicationDemographicForm from "./PublicationDemographicForStories.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
    decorators: [() => MangadexThemeProviderForStory],
    title: "MangaDex/manga/search/Form/Dialog/Content/Demographic",
    component: PublicationDemographicForm,
    tags: ["autodocs"]
} satisfies Meta<PublicationDemographicForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
