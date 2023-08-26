import { Chapter } from "@mangadex/api/structures/Chapter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type ChapterPages = {
    current: number,
    limit: number,
    shouldChange?: boolean
}

export default function useChapterPages(props: {
    chapter: Chapter
}) {
    const queryClient = useQueryClient();
    // [ ] Refactor into a function 
    const queryKey: readonly string[] = ["mdx", "current-chapter", props.chapter.get_id(), "reading-state"];
    const query = useQuery<ChapterPages>(queryKey, async () => {
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
        mutationKey: queryKey.concat("mutation"),
        async mutationFn(index: number, shouldChange? : boolean) {
            if (0 <= index && index <= (props.chapter.get_pages() - 1)) {
                queryClient.setQueryData<ChapterPages>(queryKey, {
                    current: index,
                    limit: props.chapter.get_pages(),
                    shouldChange
                });
            }
        }
    });
    const setCurrentPage = mutation.mutate ;
    return {
        queryKey,
        query,
        setCurrentPage,
        mutation
    };
}