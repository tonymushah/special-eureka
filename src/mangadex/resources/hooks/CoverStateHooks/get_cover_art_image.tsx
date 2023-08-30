import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Cover } from "@mangadex/api/structures/Cover";
import React from "react";


export function get_cover_art_image(props: {
    src: Cover;
    isThumbail?: boolean;
    size?: 256 | 512;
    query_options?: Omit<UseQueryOptions<string, Error>, "queryKey" | "queryFn">;
}) {
    const client = useHTTPClient();
    // [x] Refactor this into a new file 
    const cover_image_querykey: QueryKey = React.useMemo(() => queryKey({
        id: props.src.get_id(),
        isThumbail: props.isThumbail,
        size: props.size
    }), []);
    const cover_image_query = useQuery(cover_image_querykey, () => {
        if (props.isThumbail == undefined || props.isThumbail == false) {
            return props.src.get_CoverImage_promise(client);
        } else {
            return props.src.get_CoverImage_thumbnail_promise(props.size != undefined ? props.size : 256, client);
        }
    }, props.query_options ?? {
        "staleTime": Infinity
    });
    return {
        cover_image_query,
        cover_image_querykey
    };
}

export function queryKey(props: {
    id: string,
    isThumbail?: boolean | undefined,
    size?: 256 | 512 | undefined,
}): QueryKey {
    if (props.isThumbail == undefined || props.isThumbail == false) {
        return (["mdx", "cover", props.id, "image"]);
    } else if (props.size != undefined) {
        return (["mdx", "cover", props.id, "image", props.size]);
    } else {
        return (["mdx", "cover", props.id, "image", 256]);
    }
}

