import { TagSearchMode } from "@mangadex/gql/graphql"
import { generateContextStoresMethods } from "@mangadex/utils/contexts"
import { derived, get, type Readable, type Writable } from "svelte/store"

export type TagModes = {
    include: TagSearchMode,
    exclude: TagSearchMode
}

export function defaultTagModes(): TagModes {
    return {
        include: TagSearchMode.And,
        exclude: TagSearchMode.Or
    }
}

export const { init: initMangaSearchTagModeContext, getReadonly: getMangaSearchTagModeContext, get: getMangaSearchTagModeContextWritable } = generateContextStoresMethods<TagModes>("MANGA_SEARCH_TAG_MODES");

export function getMangaSearchTagIncludeModeContext(): Readable<TagSearchMode> {
    return derived(getMangaSearchTagModeContext(), ($a) => $a.include)
}

export function getMangaSearchTagExcludeModeContext(): Readable<TagSearchMode> {
    return derived(getMangaSearchTagModeContext(), ($a) => $a.exclude)
}

export function getMangaSearchTagIncludeModeContextWritable(): Writable<TagSearchMode> {
    const context = getMangaSearchTagModeContextWritable();
    const include_context_derived = derived(context, ($a) => $a.include)
    return {
        subscribe(run, invalidate) {
            return include_context_derived.subscribe(run, invalidate);
        },
        set(value) {
            context.update((inner) => {
                inner.include = value;
                return inner;
            })
        },
        update(updater) {
            context.update((inner) => {
                inner.include = updater(inner.include);
                return inner;
            })
        },
    }
}

export function getMangaSearchTagExcludeModeContextWritable(): Writable<TagSearchMode> {
    const context = getMangaSearchTagModeContextWritable();
    const exclude_context_derived = derived(context, ($a) => $a.exclude)
    return {
        subscribe(run, invalidate) {
            return exclude_context_derived.subscribe(run, invalidate);
        },
        set(value) {
            context.update((inner) => {
                inner.exclude = value;
                return inner;
            })
        },
        update(updater) {
            context.update((inner) => {
                inner.exclude = updater(inner.exclude);
                return inner;
            })
        },
    }
}

function inverseTagMode(value: TagSearchMode): TagSearchMode {
    if (value == TagSearchMode.And) {
        return TagSearchMode.Or
    } else {
        return TagSearchMode.And
    }
}

export function tagModeWritableToBoolWritable(writable: Writable<TagSearchMode>, trueValue: TagSearchMode = TagSearchMode.And): Writable<boolean> {
    const boolean_derived = derived(writable, ($mode) => $mode == trueValue);
    return {
        subscribe(run, invalidate) {
            return boolean_derived.subscribe(run, invalidate)
        },
        set(value) {
            const tagValue = value ? trueValue : inverseTagMode(trueValue)
            writable.set(tagValue)
        },
        update(updater) {
            writable.update((_value) => {
                const value = updater(_value == trueValue);
                return value ? trueValue : inverseTagMode(trueValue);
            })
        },
    }
}