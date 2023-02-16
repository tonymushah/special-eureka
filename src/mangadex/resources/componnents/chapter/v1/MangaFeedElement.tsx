import { useQuery } from "react-query";
import { useHTTPClient } from "../../../../../commons-res/components/HTTPClientProvider";
import { Chapter } from "../../../../api/structures/Chapter";
import { Manga } from "../../../../api/structures/Manga";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaElementDef_WChildren from "../../mangas/v1/MangaElementDef_WChildren";
import MangaElementFallback from "../../mangas/v1/MangaElementFallback";
import Chapter_Element2 from "./Chapter_Element2";

export default function MangaFeedElement(props: {
    src : Chapter
}) {
    const client = useHTTPClient();
    const manga_query_key = "mdx-manga:" + props.src.get_manga_id();
    const query = useQuery<Manga, Error>(manga_query_key, () => {
        return props.src.get_manga(client);
    },{
        staleTime : Infinity
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
    )
}