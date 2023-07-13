import { Offset_limits } from "@mangadex/api/internal/Utils";
import { Client } from "@tauri-apps/api/http";

export enum TagInsertionMode {
    Include,
    Exclude,
}

export type TagInsertion = {
    id: string,
    mode: TagInsertionMode
}

export type MangaSearchOption = {
    offset_limit: Offset_limits,
    title?: string,
    tags: TagInsertion[],
    status: Array<Status_include>,
    content_rating: Array<CttRtg_include>
    client?: Client
};

export type CttRtg_include = {name : string, include : boolean}

export type Status_include = {name : string, include : boolean}
