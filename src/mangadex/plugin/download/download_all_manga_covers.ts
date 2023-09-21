import { invoke } from "..";

export default async function download_all_manga_covers(mangaID: string) {
    const response = await invoke<string>("download_manga_covers", { mangaId: mangaID });
    const response_Json: {
        result: string,
        type: string,
        id: string,
        downloaded: Array<string>
    } = JSON.parse(response);
    return response_Json;
}
