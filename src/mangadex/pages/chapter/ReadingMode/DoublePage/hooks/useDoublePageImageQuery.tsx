import { QueryKey, useQuery } from "@tanstack/react-query";
import { getImageSize } from "react-image-size";
import { DoublePageProps } from "..";
import { Chapter } from "@mangadex/api/structures/Chapter";

export type DoublePageImageInput = [string, string] | string;

export async function queryFn({ data }: DoublePageProps) {
    const images: Array<DoublePageImageInput> = [];
    for (let index = 1; index < data.images.length; index++) {
        const currentElement = data.images[index];
        const previousCurrentElement: string | undefined = (index - 1) >= 0 ? data.images[index - 1] : undefined;

        const lastElement: DoublePageImageInput | undefined = (images.length != 0) ? images[images.length - 1] : undefined;

        if (previousCurrentElement != undefined && lastElement?.includes(previousCurrentElement) != true) {
            const currentElementSize = await getImageSize(currentElement);
            const previousElementSize = await getImageSize(previousCurrentElement);
            const currentElementRatio = currentElementSize.width / currentElementSize.height;
            const previousElementRatio = previousElementSize.width / previousElementSize.height;
            if (previousElementRatio >= 1) {
                images.push(previousCurrentElement);
            } else if (currentElementRatio >= 1) {
                images.push(currentElement);
            } else if (currentElementRatio < 1 && previousElementRatio < 1) {
                images.push([previousCurrentElement, currentElement]);
            }
        }

    }
    return images;

}

export type QueryData = DoublePageImageInput[];

export function queryKey(chapter : Chapter): QueryKey {
    return ["mdx", "chapter", chapter.get_id(), "images", "size"];
}

export function useDoublePageImageQuery(props: DoublePageProps) {
    return useQuery<QueryData>(queryKey(props.data.chapter), async () => {
        return queryFn(props);
    });
}
