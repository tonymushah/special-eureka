import { invoke } from "..";

export async function download_manga_cover(mangaID: string) {
    const response = await invoke<string>("download_manga_cover", { mangaId: mangaID });
    const response_Json: {
        result: string,
        type: string,
        id: string,
        downloaded: string
    } = JSON.parse(response);
    return response_Json;
}

export async function patch_all_manga_cover() {
    const response = await invoke<string>("patch_all_manga_cover");
    const response_Json: {
        "result": "ok",
        "tasks": "patched",
        "type": "collection",
        "data": Array<string>
    } = JSON.parse(response);
    return response_Json;
}

export async function refetch_all_manga() {
    const response = await invoke<string>("refetch_all_manga");
    const response_Json: {
        "result": "ok",
        "tasks": "patched",
        "type": "collection",
        "data": Array<string>
    } = JSON.parse(response);
    return response_Json;
}

export { default as download_chapter } from "./download_chapter";
export { default as download_chapter_data_saver } from "./download_chapter_data_saver";
export { default as download_manga } from "./download_manga";
export { default as download_all_manga_covers } from "./download_all_manga_covers";