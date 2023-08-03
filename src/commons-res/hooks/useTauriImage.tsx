import { ResponseType, fetch } from "@tauri-apps/api/http";
import { useAsync } from "react-use";

export default function useTauriImage({ src }: {
    src: string
}) {
    const res = useAsync(async () => {
        if (src) {
            return await fetch<Buffer>(src, {
                "responseType": ResponseType.Binary,
                method: "GET"
            });
        } else {
            throw new Error("the props.src should'nt be undefined");
        }
    }, [src]);
    return res;
}

export function useBufferToImgSrc({ src, buffer }: {
    src: string,
    buffer: Buffer
}) {
    /// TODO add a body
}