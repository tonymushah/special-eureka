import { ChapterDowloadResult } from "@mangadex/api/structures/Chapter";
import { invoke } from "..";

export default async function download_chapter(chapterID: string) {
    const response = await invoke<string>("download_chapter", { chapterId: chapterID });
    const response_Json: ChapterDowloadResult = JSON.parse(response);
    return response_Json;
}