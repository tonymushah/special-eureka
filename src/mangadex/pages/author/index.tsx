import React from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Mangadex_suspense, Mangadex_suspense__ } from "../..";
import { get_author_byID, get_author_queryKey_byID } from "../../resources/hooks/AuthorState";

const ErrorEL1 = React.lazy(() => import("../../resources/componnents/error/ErrorEL1"));
const Author_Page = React.lazy(() => import("../../resources/componnents/authors/Author_Page"))

export default function Author_Page_index(){
    const { id } = useParams();
    const query_key = get_author_queryKey_byID({
        author_id : id!
    });
    const queryClient = useQueryClient();
    React.useMemo(() => {
        queryClient.removeQueries(query_key);
    },[queryClient, query_key]);
    const { query } = get_author_byID({
        author_id : id!
    });
    if(query.isSuccess) {
        return (
            <Mangadex_suspense>
                <Author_Page
                    src={query.data}
                />
            </Mangadex_suspense>
        )
    }
    if(query.isError){
        return (
            <Mangadex_suspense>
                <ErrorEL1
                    error={query.error}
                />
            </Mangadex_suspense>
        )
    }
    return(
        <Mangadex_suspense__/>
    )
}