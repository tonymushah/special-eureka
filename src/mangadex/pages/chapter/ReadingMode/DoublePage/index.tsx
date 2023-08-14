import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import { QueryKey, useQuery } from "@tanstack/react-query";
import React from "react";
import { getImageSize } from "react-image-size";
import Actual from "./ActualDoublePage";
import { useDoublePageReadingState } from "./ActualDoublePage/hooks";
import { DoublePagePropsProvider } from "./Provider";

export type DoublePageImageInput = [string, string] | string;

type DoublePageProps = {
    data: ChapterPage_outlet_context;
};

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

export function queryKey(props: DoublePageProps): QueryKey {
    return ["mdx", "chapter", props.data.chapter.get_id(), "images", "size"];
}

export function useDoublePageImageQuery(props: DoublePageProps) {
    return useQuery<DoublePageImageInput[]>(queryKey(props), async () => {
        return queryFn(props);
    });
}

export default function DoublePage({ data }: DoublePageProps) {
    React.useEffect(() => {
        console.log(data);
    }, []);
    const query = useDoublePageImageQuery({
        data
    });
    const query2 = useDoublePageReadingState({
        data
    });
    if (query.isSuccess && query2.isSuccess) {
        return (
            <DoublePagePropsProvider
                value={data}
            >
                <Actual images={query.data} />
            </DoublePagePropsProvider>
        );
    }
    return (
        <React.Fragment />
    );
}