import { atom } from "jotai";
import { MangaSearchOption } from "./types";
import { ContentRating, Offset_limits, Status } from "@mangadex/api/internal/Utils";
import { focusAtom } from "jotai-optics";
export const search_option_value = atom<MangaSearchOption>({
    offset_limit: new Offset_limits(),
    tags: [],
    status: Status.array().map((d) => ({
        name: d,
        include: false
    })),
    content_rating: ContentRating.array().map((d) => ({
        name: d,
        include: false
    })),
    title: ""
});

export const search_option_value_offset_limit = focusAtom(search_option_value, (optics) => optics.prop("offset_limit"));

export const search_option_value_tags = focusAtom(search_option_value, (optics) => optics.prop("tags"));

export const search_option_value_status = focusAtom(search_option_value, (optics) => optics.prop("status"));

export const search_option_value_content_rating = focusAtom(search_option_value, (optics) => optics.prop("content_rating"));

export const search_option_value_title = focusAtom(search_option_value, (optics) => optics.prop("title"));

export const search_option_value_client = focusAtom(search_option_value, (optics) => optics.prop("client"));