import { Chapter } from "../Chapter";

export default interface GetChapterByIdResult{
    isDownloaded: boolean,
    hasFailed: boolean,
    data: Chapter
}