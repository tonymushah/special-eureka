import { useQuery } from "@tanstack/react-query";
import { useDoublePageImageQuery } from "../hooks/useDoublePageImageQuery";
import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import { DoublePageImageQueryData, query_key } from "./hooks";


export default function useDoublePageReadingState({ data }: {
    data: ChapterPage_outlet_context;
}) {
    const imageSizeQuery = useDoublePageImageQuery({
        data
    });
    const query = useQuery<DoublePageImageQueryData>(query_key(data.chapter), async () => {
        return {
            current: 0,
            limit: imageSizeQuery.data?.length
        };
    }, {
        initialData: {
            current: 0
        },
        enabled: !!imageSizeQuery.data
    });
    return query;
}
