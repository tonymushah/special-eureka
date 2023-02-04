import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Cover } from "../../../../api/structures/Cover";
import { get_cover_art_image } from "../../../hooks/CoverStateHooks";
import Mangadex_cover_not_found from "../../../imgs/cover-not-found.jpg";
import Mangadex_placeHolder from "../../../imgs/cover-placeholder.png";

export default function CoverElementVertical(props: {
    src: Cover
    isThumbail? : boolean
}) {
    const { cover_image_query } = get_cover_art_image({
        src: props.src,
        isThumbail: props.isThumbail
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
