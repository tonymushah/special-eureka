import * as Chakra from "@chakra-ui/react";
import { get_ChapterbyId } from "../../../hooks/ChapterStateHooks";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaFeedElement from "./MangaFeedElement";

export default function MangaFeedElement_byChapID(props: {
    id: string
}) {
    const { query } = get_ChapterbyId({
        id: props.id
    });
    if (query.isError) {
        return (
            <ErrorEL1 error={query.error} />
        );
    }
    if (query.isSuccess) {
        return (
            <MangaFeedElement
                src={query.data.data}
            />
        );
    }
    return (
        <Chakra.Box>
            <Chakra.Spinner />
        </Chakra.Box>
    );
}
