import { useMutation, useQuery } from "@tanstack/react-query";
import { ReadingMode } from "@mangadex/api/internal/UserOptions/ReadingMode";
import { useUserOption } from "@mangadex/resources/componnents/userOption/UserOptionProvider";

export default function useChapterReadingModeOption(){
    const query_key = ["mdx", "chapter", "reading-mode"];
    const userOption = useUserOption();
    const query = useQuery<ReadingMode>(query_key, async () => {
        return await userOption.getReadingMode();
    }, {
        staleTime: Infinity
    });
    const mutation = useMutation({
        mutationKey : query_key.concat("mutation"),
        mutationFn : async (input : ReadingMode) => {
            await userOption.setReadingMode(input);
        },
        onSuccess() {
            query.refetch();
        },
    });
    return {
        query_key,
        query,
        setReadingMode : mutation.mutate,
        mutation
    };
}