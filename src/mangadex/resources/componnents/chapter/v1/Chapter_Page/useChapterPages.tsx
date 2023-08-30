import { Chapter } from "@mangadex/api/structures/Chapter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

export type ChapterPages = {
    current: number,
    limit: number,
    shouldChange?: boolean
}

export default function useChapterPages(props: {
    chapter: Chapter
}) {
    const queryClient = useQueryClient();
    // [x] Refactor into a function 
    const queryKey_: readonly string[] = React.useMemo(() => queryKey(props), []);
    const query = useQuery<ChapterPages>(queryKey_, async () => {
        return {
            current: 0,
            limit: props.chapter.get_pages()
        };
    }, {
        initialData() {
            return {
                current: 0,
                limit: props.chapter.get_pages()
            };
        },
        staleTime: Infinity
    });
    const mutation = useMutation({
        mutationKey: queryKey_.concat("mutation"),
        async mutationFn(index: number, shouldChange? : boolean) {
            if (0 <= index && index <= (props.chapter.get_pages() - 1)) {
                queryClient.setQueryData<ChapterPages>(queryKey_, {
                    current: index,
                    limit: props.chapter.get_pages(),
                    shouldChange
                });
            }
        }
    });
    const setCurrentPage = mutation.mutate ;
    return {
        queryKey : queryKey_,
        query,
        setCurrentPage,
        mutation
    };
}

export function queryKey(props: { chapter: Chapter; }): readonly string[] {
    return ["mdx", "current-chapter", props.chapter.get_id(), "reading-state"];
}
