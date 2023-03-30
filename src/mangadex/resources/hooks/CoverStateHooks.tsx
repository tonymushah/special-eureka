import { useQuery, UseQueryOptions } from "react-query";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Cover } from "@mangadex/api/structures/Cover";

export default function get_cover_art_byId(props : {
    coverID : string
}){
    const client = useHTTPClient();
    const cover_key = "mdx-cover-" + props.coverID;
    const coverQuery = useQuery(cover_key, () => {
        return Cover.getById(props.coverID, client);
    }, {
        "staleTime": Infinity
    });
    return {
        cover_key,
        coverQuery
    };
}

export function get_cover_art_image(props : {
    src : Cover,
    isThumbail? : boolean,
    size? : 256 | 512,
    query_options?: Omit<UseQueryOptions<string, Error>, "queryKey" | "queryFn">
}){
    const client = useHTTPClient();
    const cover_image_querykey = props.isThumbail == undefined || props.isThumbail == false ? 
        "mdx-cover-" + props.src.get_id() + "-image" : 
        props.size != undefined? 
            "mdx-cover-" + props.src.get_id() + "-image-" + props.size : 
            "mdx-cover-" + props.src.get_id() + "-image-" + 256 
            ;
    const cover_image_query = useQuery(cover_image_querykey, () => {
        if(props.isThumbail == undefined || props.isThumbail == false){
            return props.src.get_CoverImage_promise(client);
        }else{
            return props.src.get_CoverImage_thumbnail_promise(props.size != undefined? props.size : 256, client);
        }
    }, props.query_options ?? {
        "staleTime" : Infinity
    });
    return {
        cover_image_query,
        cover_image_querykey
    };
}

