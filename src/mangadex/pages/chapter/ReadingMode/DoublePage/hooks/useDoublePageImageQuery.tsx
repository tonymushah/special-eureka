import { QueryKey, useQuery } from "@tanstack/react-query";
import { DoublePageProps } from "..";
import { Chapter } from "@mangadex/api/structures/Chapter";
import generateDoublePageOutput from "./generateDoublePageOutput";

export type DoublePageImageInput = [string, string] | string;

export async function queryFn({ data }: DoublePageProps) {
    return await generateDoublePageOutput(data.images);
}

export type QueryData = DoublePageImageInput[];

export function queryKey(chapter: Chapter): QueryKey {
    return ["mdx", "chapter", chapter.get_id(), "images", "size"];
}

export function useDoublePageImageQuery(props: DoublePageProps) {
    return useQuery<QueryData>(queryKey(props.data.chapter), async () => {
        return await queryFn(props);
    }, {
        enabled: true
    });
}
