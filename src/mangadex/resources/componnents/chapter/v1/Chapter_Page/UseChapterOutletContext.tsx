import { Chapter } from "@mangadex/api/structures/Chapter";
import React from "react";
import { useOutletContext } from "react-router-dom";

export type ChapterPage_outlet_context = {
    images: Array<string>
    chapter: Chapter
}

export function getLastInURL(my_url: string) {
    const step1 = new URL(my_url);
    const step2 = step1.pathname.split("/");
    const step3 = step2[step2.length - 1];
    return step3;
}

export function _getLastInURL_(my_url?: string) : string | undefined{
    if(my_url != undefined){
        try{
            return getLastInURL(my_url);
        }catch(e){
            const new_url = `local://${my_url}`;
            return getLastInURL(new_url);
        }
    }else{
        return undefined;
    }
}

export default function useChapterPageOutletContext(): ChapterPage_outlet_context {
    const data = useOutletContext<ChapterPage_outlet_context>();
    const images = React.useMemo(() => {
        return data.images.sort((a_: string, b_: string) => {
            const a = parseInt(getLastInURL(a_).match(/\d+/)?.[0] ?? "0");
            const b = parseInt(getLastInURL(b_).match(/\d+/)?.[0] ?? "0");
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        });
    }, [data]);
    return {
        images: images,
        chapter: data.chapter
    };
}