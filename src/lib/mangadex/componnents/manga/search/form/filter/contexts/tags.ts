import { TagGroup } from "@mangadex/gql/graphql";
import { generateContextStoresMethods } from "@mangadex/utils/contexts";
import { derived, type Readable } from "svelte/store";

export enum TagOptionState {
    NONE,
    INCLUDE,
    EXCLUDE
}

export type TagOptionsValue = {
    state: TagOptionState,
    name: string,
    group: TagGroup
}

export type TagOptions = Map<string, TagOptionsValue>;

export function newTagOptionsValue(name: string, group: TagGroup): TagOptionsValue {
    return {
        name,
        state: TagOptionState.NONE,
        group
    }
}

export function toggleTagOption(options: TagOptions, id: string, inverted?: boolean) {
    const option = options.get(id);
    if (option) {
        switch (option.state) {
            case TagOptionState.NONE:
                if (inverted == true) {
                    option.state = TagOptionState.EXCLUDE
                } else {
                    option.state = TagOptionState.INCLUDE;
                }
                break;
            case TagOptionState.INCLUDE:
                if (inverted == true) {
                    option.state = TagOptionState.NONE
                } else {
                    option.state = TagOptionState.EXCLUDE;
                }
                break;
            case TagOptionState.EXCLUDE:
                if (inverted == true) {
                    option.state = TagOptionState.INCLUDE
                } else {
                    option.state = TagOptionState.NONE;
                }
                break;
            default:
                break;
        }
        //options.set(id, option);
    }
}

export const {
    getReadonly: getMangaSearchTagOptionsContextStore,
    get: getMangaSearchTagOptionsContextStoreWritable,
    init: initMangaSearchTagOptionsContextStore
} = generateContextStoresMethods<TagOptions>("MANGA_SEARCH_TAG_OPTIONS");

export type TagOptionsValueGrouped = {
    id: string,
    name: string,
    state: TagOptionState
}

export function groupTagOption(options: Readable<TagOptions>, group: TagGroup): Readable<TagOptionsValueGrouped[]> {
    return derived(options, ($options) => Array.from($options.entries()).filter(([, a]) => a.group == group).flatMap(([id, value]) => {
        return {
            id,
            name: value.name,
            state: value.state
        };
    }))
}