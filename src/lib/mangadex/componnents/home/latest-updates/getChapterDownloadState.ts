import { graphql } from "@mangadex/gql"
import { sub_end } from "@mangadex/utils"
import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState"
import type { Client } from "@urql/svelte"
import { writable, type Writable } from "svelte/store"
import { v4 } from "uuid"

type GetChapterDownloadStateParams = {
    id: string,
    client: Client
}

export const isChapterDownloadedQuery = graphql(`
    query isChapterDownloaded($id: UUID!) {
        chapter {
            isDownloaded(id: $id) {
                isDownloaded
                hasFailed
            }
        }
    }
`);

export const ChapterDownloadStateSubQuery = graphql(`
    subscription watchChapterDownloadState($id: UUID!, $sub: UUID!) {
        watchDownloadState(objectId: $id, subId: $sub) {
            hasFailed
            isDownloaded
        }
    }
`);

export function DownloadStateToChapterDownloadState(data: {
    isDownloaded: boolean,
    hasFailed: boolean
}): ChapterDownloadState {
    if (data.isDownloaded) {
        if (data.hasFailed) {
            return ChapterDownloadState.Downloaded
        } else {
            return ChapterDownloadState.Failed
        }
    } else {
        return ChapterDownloadState.NotDownloaded
    }
}


export default function getChapterDownloadState({ id, client }: GetChapterDownloadStateParams): Writable<ChapterDownloadState> {
    const store = writable<ChapterDownloadState>(ChapterDownloadState.NotDownloaded, (set) => {
        client.query(isChapterDownloadedQuery, {
            id
        }).toPromise().then((r) => {
            const data = r.data?.chapter.isDownloaded;
            if (data) set(DownloadStateToChapterDownloadState(data))
        });
        const sub_id = v4();
        const sub = client.subscription(ChapterDownloadStateSubQuery, {
            id,
            sub: sub_id
        }).subscribe((v) => {
            const state = v.data?.watchDownloadState;
            if (state) set(DownloadStateToChapterDownloadState(state));
        });
        return () => {
            sub_end(sub_id);
            sub.unsubscribe();
        }
    });

    return store
}
