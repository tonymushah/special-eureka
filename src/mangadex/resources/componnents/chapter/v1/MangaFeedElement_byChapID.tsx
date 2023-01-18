import React from "react";
import * as Chakra from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Chapter } from "../../../../api/structures/Chapter";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaFeedElement from "./MangaFeedElement";

export default function MangaFeedElement_byChapID(props: {
    id: string
}) {
    const query = useQuery<Chapter, Error>("mdx-chapter:" + props.id, () => {
        return Chapter.get_ChapterbyId(props.id);
    }, {
        staleTime: Infinity
    })
    if(query.isLoading){
        return (
            <Chakra.Box>
                <Chakra.Spinner/>
            </Chakra.Box>
        );
    }
    if(query.isError){
        return (
            <ErrorEL1 error={query.error}/>
        )
    }
    return (
        <MangaFeedElement
            src={query.data!}
        />
    );
    
}
