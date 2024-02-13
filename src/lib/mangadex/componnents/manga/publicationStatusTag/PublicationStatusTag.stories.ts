import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/index.css";

import PublicationStatusTag from "./PublicationStatusTag.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { MangaStatus } from "@mangadex/gql/graphql";

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/status/MangaStatusTag",
	component: PublicationStatusTag,
	tags: ["autodocs"]
} satisfies Meta<PublicationStatusTag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Cancelled: Story = {
	args: {
		status: MangaStatus.Cancelled
	}
};

export const Completed: Story = {
	args: {
		status: MangaStatus.Completed
	}
};

export const Hiatus: Story = {
	args: {
		status: MangaStatus.Hiatus
	}
};

export const Ongoing: Story = {
	args: {
		status: MangaStatus.Ongoing
	}
};
