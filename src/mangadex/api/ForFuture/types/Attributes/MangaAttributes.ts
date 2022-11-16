import { Attributes } from ".";
import { TagAttributes } from "./TagAttributes";

export type MangaAttributes = {
    title : any,
    altTitles: Array<any>,
    description: any,
    isLocked : boolean,
    links : any,
    originalLanguage: string,
    lastVolume : number,
    lastChapter: number,
    publicationDemographic : string,
    status: string,
    year : number,
    contentRating : string,
    tags: Array<Attributes<TagAttributes>>,
    state : string,
    chapterNumbersResetOnNewVolume : boolean,
    createdAt : Date,
    updatedAt : Date,
    version : number,
    availableTranslatedLanguages : Array<String>
    latestUploadedChapter: string
}