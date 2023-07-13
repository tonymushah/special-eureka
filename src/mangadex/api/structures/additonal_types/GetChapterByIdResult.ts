import { Chapter, Chapter_withAllIncludes } from "../Chapter";

export default interface GetChapterByIdResult{
    isDownloaded: boolean,
    hasFailed: boolean,
    data: Chapter | Chapter_withAllIncludes
}