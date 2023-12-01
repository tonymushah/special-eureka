//import { queryClient } from "@mangadex/resources/query.client";
import { getImageSize as getReactImageSize } from "react-image-size";

export const getImageSize = async (url: string) => {
    //const file_ext = fileExtension(url);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    /*if(window.__TAURI__ != undefined){
        
        const res = await queryClient.fetchQuery([url], () => fetch<Buffer>(url, {
            "responseType": ResponseType.Binary,
            method: "GET"
        }));
        return queryClient.fetchQuery([url, "dimension"], () => getReactImageSize(`data:image/${file_ext};base64,${toBase64(res.data)}`));
    }else{*/
    return /*queryClient.fetchQuery([url, "dimension"], () => */getReactImageSize(url); /*);*/
    //}
};