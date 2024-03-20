import type { Meta, StoryObj } from "@storybook/svelte";
import { within, fireEvent } from "@storybook/testing-library";
import "@fontsource/poppins/latin.css";

import TopInfo from "./MangaPageTopInfoForStories.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { fukkoi1 } from "@mangadex/test-data/images/fukkoi";
import { id, attributes, author } from "./data/b4c93297-b32f-4f90-b619-55456a38b0aa";
import manga_altTitle_to_lang_map from "@mangadex/utils/lang/record-to-map/manga-altTitle-to-lang-map";
import get_value_and_random_if_undefined from "@mangadex/utils/lang/get_value_and_random_if_undefined";
import { writable } from "svelte/store";
import { MangaStatus, ReadingStatus } from "@mangadex/gql/graphql";

const altTitle = manga_altTitle_to_lang_map(attributes.altTitles);

const meta = {
	decorators: [() => MangadexThemeProviderForStory],
	title: "MangaDex/manga/page/top-info/TopInfo/WithInteractivity",
	component: TopInfo,
	tags: ["autodocs"]
} satisfies Meta<TopInfo>;

export default meta;

const args = {
	id,
	title: attributes.title.en,
	altTitle: get_value_and_random_if_undefined(altTitle, "en"),
	coverImage: writable(fukkoi1),
	coverImageAlt: fukkoi1,
	authors: [
		{
			id: author.id,
			name: author.attributes.name
		}
	],
	tags: attributes.tags.map((t) => ({
		id: t.id,
		name: t.attributes.name.en
	})),
	status: MangaStatus.Ongoing,
	description: attributes.description.en
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args
};

export const WithReadingButtonInteration: Story = {
	args,
	async play(self) {
		const canvas = within(self.canvasElement);
		const step = self.step;
		await step("click on add to library button", async () => {
			fireEvent.click(canvas.getByText("Add to Library", { selector: "button div" }));
		});
		await step("click the status select button", async () => {
			fireEvent.click(canvas.getByText("None", { selector: "button div.inner-button span" }));

			fireEvent.click(
				canvas.getByText("Reading", {
					selector: "dialog div.menu div.menu div.menu-item p.label"
				})
			);
		});
		await step("click the icon button", async () => {
			fireEvent.click(self.canvasElement.querySelector("dialog div.is-following-off")!);
		});
		await step("click the add button", async () => {
			fireEvent.click(canvas.getByText("Add", { selector: "dialog button div.buttons" }));
		});
	}
};
