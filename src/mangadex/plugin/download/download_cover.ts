import { invoke } from "..";

type DownloadCoverOutput = {
    result : "ok",
    type : "cover",
    downloaded : string
}

export default async function download_cover(cover_id : string) : Promise<DownloadCoverOutput>{
    const retrieved = await invoke<string>("download_cover", {
        coverId : cover_id
    });
    return JSON.parse(retrieved);
}