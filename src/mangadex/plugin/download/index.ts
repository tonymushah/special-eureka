import { invoke } from "..";

export async function download_chapter(chapterID: string) {
    const response = await invoke<string>("download_chapter", { chapterId: chapterID });
    const response_Json: {
        result: string,
        dir: string,
        downloaded: Array<string>
    } = JSON.parse(response);
    return response_Json;
}

export async function download_chapter_data_saver(chapterID: string) {
    const response = await invoke<string>("download_chapter_data_saver_mode", { chapterId: chapterID });
    const response_Json: {
        result: string,
        dir: string,
        downloaded: Array<string>
    } = JSON.parse(response);
    return response_Json;
}

export async function download_manga(mangaID: string) {
    const response = await invoke<string>("download_manga", { mangaId: mangaID });
    const response_Json: {
        result: string,
        type: string,
        id: string
    } = JSON.parse(response);
    return response_Json;
}

export async function download_all_manga_covers(mangaID: string) {
    const response = await invoke<string>("download_manga_covers", { mangaId: mangaID });
    const response_Json: {
        result: string,
        type: string,
        id: string,
        downloaded: Array<string>
    } = JSON.parse(response);
    return response_Json;
}

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