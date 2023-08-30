import { QueryKey, useQuery } from "@tanstack/react-query";
import { ResponseType, fetch } from "@tauri-apps/api/http";
import { getImageSize as getReactImageSize } from "react-image-size";
import { DoublePageProps } from "..";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { toBase64 } from "@commons-res/components/TauriImage";
import fileExtension from "@commons-res/functions/file-extension";
import { queryClient } from "@mangadex/resources/query.client";

export type DoublePageImageInput = [string, string] | string;

export async function queryFn({ data }: DoublePageProps) {
    const images: Array<DoublePageImageInput> = [];
    const getImageSize = async (url : string) => {
        const file_ext = fileExtension(url);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if(window.__TAURI__ != undefined){
            
            const res = await queryClient.fetchQuery([url], () => fetch<Buffer>(url, {
                "responseType": ResponseType.Binary,
                method: "GET"
            }));
            return queryClient.fetchQuery([url, "dimension"], () => getReactImageSize(`data:image/${file_ext};base64,${toBase64(res.data)}`));
        }else{
            return queryClient.fetchQuery([url, "dimension"], () => getReactImageSize(url));
        }
    };
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
        return await queryFn(props);
    }, {
        enabled : true
    });
}
