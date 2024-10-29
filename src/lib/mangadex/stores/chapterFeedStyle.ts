import { graphql } from "@mangadex/gql";
import { ChapterFeedStyle } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { sub_end } from "@mangadex/utils";
import type { Client } from "@urql/svelte";
import { get, readable, type Writable } from "svelte/store";
import { v4 } from "uuid";

const sub = graphql(`
    subscription chapterFeedStyleSub($subId: UUID!) {
        watchChapterFeedStyle(subId: $subId)
    }
`);

const mutation = graphql(`
    mutation updateChapterFeedStyle($style: ChapterFeedStyle!) {
        userOption {
            setChapterFeedStyle(style: $style)
        }
    }
`);

const readStore = readable(ChapterFeedStyle.CoverLess, (set) => {
    const subId = v4();
    const sub_ = client.subscription(sub, {
        subId
    }).subscribe((res) => {
        if (res.data?.watchChapterFeedStyle) {
            set(res.data.watchChapterFeedStyle);
        }
    })
    return () => {
        sub_.unsubscribe();
        sub_end(subId)
    }
});

export async function updateChapterFeedStyle(client: Client, style: ChapterFeedStyle) {
    await client.mutation(mutation, {
        style
    }).toPromise()
}

const chapterFeedStyle: Writable<ChapterFeedStyle> = {
    subscribe: readStore.subscribe,
    set(value) {
        updateChapterFeedStyle(client, value);
    },
    update(updater) {
        updateChapterFeedStyle(client, updater(get(readStore)));
    },
};

export default chapterFeedStyle;