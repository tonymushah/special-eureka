import { invoke } from "..";

export default async function download_manga(mangaID: string) {
    const response = await invoke<string>("download_manga", { mangaId: mangaID });
    const response_Json: {
        result: string,
        type: string,
        id: string
    } = JSON.parse(response);
    return response_Json;
}
