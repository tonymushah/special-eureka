import type { Readable } from "svelte/store";

export type StaffPicksTitle = {
    id: string,
    title: string,
    description: string,
    coverImage: Readable<string | undefined>,
    coverImageAlt: string,
}