import { Image, ImageProps } from "@chakra-ui/react";
import fileExtension from "@commons-res/functions/file-extension";
import { ResponseType, fetch } from "@tauri-apps/api/http";
import React from "react";
import { toBase64 } from "./TauriImage";
import { useQuery } from "@tanstack/react-query";

export default function TauriQueryImage(props: ImageProps) {
    const query = useQuery(["image", props.src], async () => {
        if (props.src) {
            const res = await fetch<Buffer>(props.src, {
                "responseType": ResponseType.Binary,
                method: "GET"
            });
            if(res.ok){
                return res;
            }else{
                throw new Error(`Error on sending request to fetch image ${props.src}`);
            }
        } else {
            throw new Error("the props.src should'nt be undefined");
        }
    }, {
        enabled : !!props.src
    });
    const onLoadingProps = React.useMemo(() => {
        const re_props = structuredClone(props);
        re_props.src = props.fallbackSrc;
        return re_props;
    }, []);
    const onSuccessProps = React.useMemo(() => {
        const re_props = structuredClone(props);
        if(query.data){
            if(props.src){
                const file_ext = fileExtension(props.src);
                re_props.src = `data:image/${file_ext};base64,${toBase64(query.data.data)}`;
            }
        }
        return re_props;
    }, [query.data]);
    if(query.isSuccess){
        return (
            <Image {...onSuccessProps}/>
        );
    } else {
        return (
            <Image {...onLoadingProps}/>
        );
    }
}