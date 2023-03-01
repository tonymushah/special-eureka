import { useOutletContext } from "react-router-dom";

type ChapterPage_outlet_context = {
    images: Array<string>
}

export default function useChapterPageOutletContext(): ChapterPage_outlet_context {
    let data = useOutletContext<ChapterPage_outlet_context>();
    data.images.sort((a_ : string,b_: string)=>{
        let a = parseInt(a_.match(/\d+/)![0]);
        let b = parseInt(b_.match(/\d+/)![0]);
        if(a > b) return 1;
            if(a < b) return -1;
            return 0;
        });
    return data;
}





