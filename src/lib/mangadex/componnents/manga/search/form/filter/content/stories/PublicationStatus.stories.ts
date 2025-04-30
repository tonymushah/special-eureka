import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import PublicationStatusForm from "./PublicationStatusForStories.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/search/Form/Dialog/Content/Status",
	component: PublicationStatusForm,
	tags: ["autodocs"]
} satisfies Meta<PublicationStatusForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
