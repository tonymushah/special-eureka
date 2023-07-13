import Chapter_history from "@mangadex/api/history/Chapter.history";
import { usePropsChapter } from "@mangadex/resources/componnents/chapter/v1/PropsContext";
import React from "react";

export default function AddInHistory(){
    const { chapter } = usePropsChapter();
    React.useEffect(() => {
        const history = new Chapter_history();
        history.addChapter(chapter.get_id());
    }, []);
    return (
        <React.Fragment/>
    );
}