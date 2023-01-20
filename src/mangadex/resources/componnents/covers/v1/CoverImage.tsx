import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Cover } from "../../../../api/structures/Cover";
import Mangadex_placeHolder from "../../../imgs/cover-placeholder.png";
import Mangadex_cover_not_found from "../../../imgs/cover-not-found.jpg";
import { useQuery } from "react-query";

export default function CoverImage(props: {
    src: Cover,
    isThumbail?: boolean,
    size?: 256 | 512,
    image_props?: Chakra.ImageProps
}){
    const cover_image_querykey = props.isThumbail == undefined || props.isThumbail == false ? 
        "mdx-cover-" + props.src.get_id() + "-image" : 
        props.size != undefined? 
            "mdx-cover-" + props.src.get_id() + "-image-" + props.size : 
            "mdx-cover-" + props.src.get_id() + "-image-" + 256 
            ;
    const cover_image_query = useQuery(cover_image_querykey, () => {
        if(props.isThumbail == undefined || props.isThumbail == false){
            return props.src.get_CoverImage_promise();
        }else{
            return props.src.get_CoverImage_thumbnail_promise(props.size != undefined? props.size : 256);
        }
    }, {
        staleTime: 1000 * 60 * 5
    });
    if(cover_image_query.isSuccess){
        return(
            <Chakra.Image
                src={cover_image_query.data}
                fallbackSrc={Mangadex_placeHolder}
                {...props.image_props}
            />
        )
    }
    if(cover_image_query.isError){
        return(
            <Chakra.Image
                src={Mangadex_cover_not_found}
                {...props.image_props}
            />
        )
    }
    return(
        <Chakra.Image
            src={Mangadex_placeHolder}
            {...props.image_props}
        />
    )
}