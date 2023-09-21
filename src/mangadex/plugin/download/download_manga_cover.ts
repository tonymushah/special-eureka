import { invoke } from "..";

export default async function download_manga_cover(mangaID: string) {
    const response = await invoke<string>("download_manga_cover", { mangaId: mangaID });
    const response_Json: {
        result: string,
        type: string,
        id: string,
        downloaded: string
    } = JSON.parse(response);
    return response_Json;
}