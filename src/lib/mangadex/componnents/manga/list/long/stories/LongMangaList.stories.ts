import type { Meta, StoryObj } from "@storybook/svelte";
import "@fontsource/poppins/latin.css";

import List, { type LongMangaListItemProps } from "../LongMangaList.svelte";
import MangadexThemeProviderForStory from "@mangadex/componnents/theme/MangadexThemeProviderForStory.svelte";
import { volume7 } from "@mangadex/test-data/images/yuusha-party";
import { ContentRating, MangaStatus } from "@mangadex/gql/graphql";
import { readable } from "svelte/store";
import { range, random } from "lodash";
import { v4 } from "uuid";
import { honey_trap1 } from "@mangadex/test-data/images/honey-trap";
import { data3 } from "@mangadex/componnents/tag/testDatas";

const meta = {
    decorators: [() => MangadexThemeProviderForStory],
    title: "MangaDex/manga/list/Long",
    component: List,
    tags: ["autodocs"]
} satisfies Meta<List>;

export default meta;

type Story = StoryObj<typeof meta>;

const elementData = {
    coverImage: readable(honey_trap1),
    coverImageAlt: "Honey Trap Shared House volume 1",
    status: MangaStatus.Ongoing,
    title: "Honey Trap Shared House",
    description:
        "Amet numquam veniam magni repellat. Et nulla tempora placeat in omnis in. Fuga ut quos optio inventore alias delectus magni laboriosam voluptatem. Consequatur temporibus alias impedit voluptatem ducimus laudantium dolorem quo ut.",
    tags: data3.map((v) => ({
        id: v.id,
        name: v.attributes.name.en
    })),
    contentRating: ContentRating.Erotica
}

export const Default: Story = {
    args: {
        list: range(random(2, 10, false)).map(() => ({
            ...elementData,
            id: v4()
        }))
    }
};
