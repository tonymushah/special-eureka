import { Chapter } from "@mangadex/api/structures/Chapter";
import { useOutletContext } from "react-router-dom";

export type ChapterPage_outlet_context = {
    images: Array<string>
    chapter : Chapter
}

function getLastInURL(my_url: string) {
    const step1 = new URL(my_url);
    const step2 = step1.pathname.split("/");
    const step3 = step2[step2.length - 1];
    return step3;
}

export default function useChapterPageOutletContext(): ChapterPage_outlet_context {
    const data = useOutletContext<ChapterPage_outlet_context>();
    const images = data.images.sort((a_: string, b_: string) => {
        const a = parseInt(getLastInURL(a_).match(/\d+/)![0]);
        const b = parseInt(getLastInURL(b_).match(/\d+/)![0]);
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });
    return {
        images: images,
        chapter: data.chapter
    };
}
