import type ChapterElement1 from "@mangadex/componnents/chapter/base/element1/ChapterElement1.svelte";
import type { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
import type { ComponentProps } from "svelte";
import { writable, type Readable, type Writable } from "svelte/store";

type Chapter = ComponentProps<ChapterElement1>;

export type ChapterMap = Map<string, Chapter>;

type SetCommentsEntry = {
    id: string,
    comments: number
}

type ChapterStores = Writable<ChapterMap> & {
    add: (value: Chapter) => void,
    remove: (id: string) => void,
    clear: () => void,
    get: () => ChapterMap
    setReadingState: (id: string, state: Readable<ChapterDownloadState>) => void,
    addByBatch: (value: Chapter[]) => void;
    setComment: (id: string, comments: number) => void;
    setComments: (input: SetCommentsEntry[]) => void;
}

export default function chapterStores(): ChapterStores {
    const init = new Map<string, Chapter>();
    const store = writable(init);
    return {
        ...store,
        add(value: Chapter) {
            store.update((u) => {
                u.set(value.id, value);
                return u
            })
        },
        get() {
            return init;
        },
        addByBatch(value: Chapter[]) {
            store.update((u) => {
                value.forEach((v) => {
                    u.set(v.id, v);
                })
                return u
            })
        },
        remove(id: string) {
            store.update((u) => {
                u.delete(id);
                return u
            })
        },
        clear() {
            store.update((u) => {
                u.clear();
                return u
            })
        },
        setReadingState(id: string, state: Readable<ChapterDownloadState>) {
            store.update((u) => {
                const chapter = u.get(id);
                if (chapter) {
                    chapter.download_state = state
                }
                return u
            })
        },
        setComment(id, comments) {
            store.update((u) => {
                const chapter = u.get(id);
                if (chapter) {
                    chapter.comments = comments;
                }
                return u;
            })
        },
        setComments(input) {
            store.update((u) => {
                input.forEach(({ id, comments }) => {
                    const chapter = u.get(id);
                    if (chapter) {
                        chapter.comments = comments;
                    }
                })
                return u;
            })
        },
    }
}