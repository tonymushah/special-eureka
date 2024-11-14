import { graphql } from "@mangadex/gql";
import { PaginationStyle } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { sub_end } from "@mangadex/utils";
import type { Client } from "@urql/svelte";
import { get, readable, type Writable } from "svelte/store";
import { v4 } from "uuid";

const sub = graphql(`
    subscription paginationStyleUpdate($subId: UUID!) {
        watchPaginationStyle(subId: $subId)
    }
`);

const mutation = graphql(`
    mutation updatePaginationStyle($style: PaginationStyle!) {
        userOption {
            setPaginationStyle(style: $style)
        }
    }
`);

export async function updatePaginationStyle(client: Client, style: PaginationStyle) {
    await client.mutation(mutation, {
        style
    }).toPromise()
}

const readStore = readable(PaginationStyle.InfiniteScroll, (set) => {
    const subId = v4();
    const sub_ = client.subscription(sub, {
        subId
    }).subscribe((res) => {
        if (res.data?.watchPaginationStyle) {
            set(res.data.watchPaginationStyle);
        }
    })
    return () => {
        sub_.unsubscribe();
        sub_end(subId)
    }
});

const paginationStyle: Writable<PaginationStyle> = {
    subscribe: readStore.subscribe,
    set(value) {
        updatePaginationStyle(client, value);
    },
    update(updater) {
        updatePaginationStyle(client, updater(get(readStore)));
    },
};

export default paginationStyle;