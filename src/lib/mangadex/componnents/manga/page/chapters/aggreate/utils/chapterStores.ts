import type ChapterElement1 from "@mangadex/componnents/chapter/base/element1/ChapterElement1.svelte";
import type { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
import type { ComponentProps } from "svelte";
import { writable, type Readable, type Writable } from "svelte/store";

type Chapter = ComponentProps<ChapterElement1>;

type ChapterStores = Writable<Map<string, Chapter>> & {
    add: (value: Chapter) => void,
    remove: (id: string) => void,
    clear: () => void,
    setReadingState: (id: string, state: Readable<ChapterDownloadState>) => void,
    addByBatch: (value: Chapter[]) => void;
}

export default function chapterStores(): ChapterStores {
    const store = writable(new Map<string, Chapter>());
    return {
        ...store,
        add(value: Chapter) {
            store.update((u) => {
                u.set(value.id, value);
                return u
            })
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
        }
    }
}