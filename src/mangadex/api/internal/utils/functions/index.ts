import { Chapter } from "@mangadex/api/structures/Chapter";
import MangaChapter_Accordion from "../MangaChapter_Accordion";

export const serialize = function (obj: Record<string, string>): string {
    const str = [];
    for (const p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
};

export function get_manga_listBy_chapter_array(to_use: Array<Chapter>): Array<string> {
    const returns: Array<string> = new Array<string>();
    to_use.forEach(element => {
        try {
            const manga_id: string = element.get_manga_id();
            if (manga_id != undefined && returns.includes(manga_id) == false) {
                returns.push(manga_id);
            }
        // eslint-disable-next-line no-empty
        } catch (error) {
        }
    });
    return returns;
}

export function get_MangaChapter_Accordions_byChapterArray(to_use: Array<Chapter>): Array<MangaChapter_Accordion> {
    return get_manga_listBy_chapter_array(to_use).map<MangaChapter_Accordion>((value: string) => {
        const instance = new MangaChapter_Accordion(value);
        to_use.forEach((chapter) => {
            instance.insertChapter(chapter);
        });
        return instance;
    });
}

export function formatDate(mydate: Date): string {
    return mydate.toJSON().split(".")[0];
}
export function make_first_UpperCare(input: string): string {
    try {
        return input.charAt(0).toUpperCase() + input.slice(1);
    } catch (e) {
        return input;
    }
}

