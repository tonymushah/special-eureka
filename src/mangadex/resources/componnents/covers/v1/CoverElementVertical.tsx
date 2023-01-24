import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Await } from "react-router-dom";
import { Cover } from "../../../../api/structures/Cover";
import Mangadex_placeHolder from "../../../imgs/cover-placeholder.png";
import Mangadex_cover_not_found from "../../../imgs/cover-not-found.jpg";
import { useQuery } from "react-query";
import { useHTTPClient } from "../../../../../commons-res/components/HTTPClientProvider";

export default function CoverElementVertical(props: {
    src: Cover
    isThumbail? : boolean
}) {
    const client = useHTTPClient();
    const cover_image_querykey = props.isThumbail == undefined || props.isThumbail == false ? "mdx-cover-" + props.src.get_id() + "-image" : "mdx-cover-" + props.src.get_id() + "-image-256";
    const cover_image_query = useQuery(cover_image_querykey, () => {
        if(props.isThumbail == undefined || props.isThumbail == false){
            return props.src.get_CoverImage_promise(client);
        }else{
            return props.src.get_CoverImage_thumbnail_promise(256, client);
        }
    }, {
        staleTime: 1000 * 60 * 5
    });
    if (cover_image_query.isLoading) {
        return (
            <Chakra.Skeleton
                borderTopRadius={"10px"}
                height={"150px"}
            />
        );
    }
    if (cover_image_query.isError) {
        return (<Chakra.Image
            src={Mangadex_cover_not_found}
            fallbackSrc={Mangadex_placeHolder}
            borderTopRadius={"10px"}
        />)
    }
    return (
        <Chakra.Image
            src={cover_image_query.data!}
            fallbackSrc={Mangadex_placeHolder}
            borderTopRadius={"10px"}
        />
    );
}
