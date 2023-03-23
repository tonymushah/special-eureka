import * as Chakra from "@chakra-ui/react";
import React from "react";
import Consumer from "../../../../../commons-res/components/Consumer";
import { Cover } from "../../../../api/structures/Cover";
import { get_cover_art_image } from "../../../hooks/CoverStateHooks";
import Mangadex_cover_not_found from "../../../imgs/cover-not-found.jpg";
import Mangadex_placeHolder from "../../../imgs/cover-placeholder.png";

export default function CoverImage(props: {
    src: Cover,
    isThumbail?: boolean,
    size?: 256 | 512,
    image_props?: Chakra.ImageProps
    other_comp? : (data : string) => React.ReactNode
}){
    const { cover_image_query } = get_cover_art_image({
        src : props.src,
        isThumbail : props.isThumbail,
        size : props.size
    });
    
    if(cover_image_query.isSuccess){
        if(props.other_comp !== undefined){
            <Consumer to_consume={cover_image_query.data}>
                {
                    props.other_comp
                }
            </Consumer>
        }else{
            return(
                <Chakra.Image
                    src={cover_image_query.data}
                    fallbackSrc={Mangadex_placeHolder}
                    {...props.image_props}
                />
            )
        }
        
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