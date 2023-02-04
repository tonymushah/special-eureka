import { useOutletContext } from "react-router-dom";

type ChapterPage_outlet_context = {
    images: Array<string>
}

export default function useChapterPageOutletContext(): ChapterPage_outlet_context {
    let data = useOutletContext<ChapterPage_outlet_context>();
    return data;
}





