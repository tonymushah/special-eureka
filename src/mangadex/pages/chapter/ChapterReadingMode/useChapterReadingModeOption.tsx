import { useQuery, useQueryClient } from "@tanstack/react-query";

export enum ReadingMode{
    Longstrip = "LongStrip",
    Swipper = "Swipper",
    WideStrip = "WideStrip"
}
export default function useChapterReadingModeOption(){
    const query_key = ["mdx", "chapter", "reading-mode"];
    const queryClient = useQueryClient();
    const query = useQuery<ReadingMode>(query_key, async () => {
        return ReadingMode.Longstrip;
    }, {
        staleTime: Infinity
    });
    const setReadingMode = (mode : ReadingMode) => {
        queryClient.setQueryData<ReadingMode>(query_key, mode);
    };
    return {
        query_key,
        query,
        setReadingMode
    };
}