import { Chapter } from "@mangadex/api/structures/Chapter";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type ChapterPages = {
    current: number,
    limit: number
}

export default function useChapterPages(props: {
    chapter: Chapter
}) {
    const queryClient = useQueryClient();
    const queryKey = ["mdx", "current-chapter", props.chapter.get_id(), "reading-state"];
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
    const setCurrentPage = (index: number) => {
        if (0 <= index && index <= (props.chapter.get_pages() - 1)) {
            queryClient.setQueryData<ChapterPages>(queryKey, {
                current: index,
                limit: props.chapter.get_pages()
            });
        }
    };
    return {
        queryKey,
        query,
        setCurrentPage
    };
}