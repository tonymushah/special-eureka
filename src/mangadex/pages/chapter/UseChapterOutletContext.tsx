import { useOutletContext } from "react-router-dom";

type ChapterPage_outlet_context = {
    images: Array<string>
}

function getLastInURL(my_url: string) {
    let step1 = new URL(my_url);
    let step2 = step1.pathname.split("/");
    let step3 = step2[step2.length - 1];
    return step3;
}

export default function useChapterPageOutletContext(): ChapterPage_outlet_context {
    let data = useOutletContext<ChapterPage_outlet_context>();
    let images = data.images.sort((a_: string, b_: string) => {
        let a = parseInt(getLastInURL(a_).match(/\d+/)![0]);
        let b = parseInt(getLastInURL(b_).match(/\d+/)![0]);
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });
    return {
        images: images
    };
}
