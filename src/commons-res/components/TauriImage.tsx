import { Image, ImageProps } from "@chakra-ui/react";
import fileExtension from "@commons-res/functions/file-extension";
import { ResponseType, fetch } from "@tauri-apps/api/http";
import React from "react";
import { useAsync } from "react-use";

/** 
    @source https://stackoverflow.com/a/59430459
*/
export function toBase64(arr: Buffer) {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
}

export default function TauriImage(props: ImageProps) {
    const res = useAsync(async () => {
        if (props.src) {
            return await fetch<Buffer>(props.src, {
                "responseType": ResponseType.Binary,
                method: "GET"
            });
        } else {
            throw new Error("the props.src should'nt be undefined");
        }
    }, [props.src]);
    const onLoadingProps = React.useMemo(() => {
        const re_props = structuredClone(props);
        re_props.src = props.fallbackSrc;
        return re_props;
    }, []);
    const onSuccessProps = React.useMemo(() => {
        const re_props = structuredClone(props);
        if(res.value){
            if(props.src){
                const file_ext = fileExtension(props.src);
                re_props.src = `data:image/${file_ext};base64,${toBase64(res.value.data)}`;
            }
        }
        return re_props;
    }, [res.value]);
    if(res.value){
        return (
            <Image {...onSuccessProps}/>
        );
    } else {
        return (
            <Image {...onLoadingProps}/>
        );
    }
}