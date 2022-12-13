import React from "react";
import { useQuery } from "react-query";
import { Chapter } from "../../../../api/structures/Chapter";
import * as Chakra from "@chakra-ui/react"
import Chapter_Element1 from "./Chapter_Element1";
import ErrorEL1 from "../../error/ErrorEL1";

export default function Chapter_Element1_byChapID(props: {
    id: string
}) {
    const query = useQuery("mdx-chapter:" + props.id, () => {
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
        <Chapter_Element1
            chapter={query.data!}
        />
    );
    
}