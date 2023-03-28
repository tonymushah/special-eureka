import { get_manga_byId } from "@mangadex/resources/hooks/MangaStateHooks";
import { Chapter } from "@mangadex/api/structures/Chapter";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaElementDef_WChildren from "../../mangas/v1/MangaElementDef_WChildren";
import MangaElementFallback from "../../mangas/v1/MangaElementFallback";
import Chapter_Element2 from "./Chapter_Element2";

export default function MangaFeedElement(props: {
    src : Chapter
}) {
    const { query } = get_manga_byId({
        mangaID : props.src.get_manga_id()
    });
    if(query.isLoading == true){
        return (
            <MangaElementFallback/>
        );
    }
    if(query.isError == true){
        return (
            <ErrorEL1 error={query.error}/>
        );
    }
    return (
        <MangaElementDef_WChildren 
            src={query.data!}
            isRefetching={query.isRefetching}
        >
            <Chapter_Element2
                chapter={props.src}
            />
        </MangaElementDef_WChildren>
    );
}