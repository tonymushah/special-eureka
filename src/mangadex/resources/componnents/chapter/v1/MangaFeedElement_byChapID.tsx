import React from "react";
import * as Chakra from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Chapter } from "../../../../api/structures/Chapter";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaFeedElement from "./MangaFeedElement";
import { useHTTPClient } from "../../../../../commons-res/components/HTTPClientProvider";
import { get_ChapterbyId } from "../../../hooks/ChapterStateHooks";

export default function MangaFeedElement_byChapID(props: {
    id: string
}) {
    const client = useHTTPClient();
    const {query} = get_ChapterbyId({
        id : props.id
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
