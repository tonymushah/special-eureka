import * as Chakra from "@chakra-ui/react";
import { get_ChapterbyId } from "../../../hooks/ChapterStateHooks";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaFeedElement from "./MangaFeedElement";

export default function MangaFeedElement_byChapID(props: {
    id: string
}) {
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
            src={query.data!.data}
        />
    );
    
}
