import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Await } from "react-router-dom";
import { Cover } from "../../../../api/structures/Cover";
import Mangadex_placeHolder from "../../../imgs/cover-placeholder.png";
import Mangadex_cover_not_found from "../../../imgs/cover-not-found.jpg";
import { useQuery } from "react-query";

export default function CoverElementVertical2(props: {
    src: Cover
}) {
    const cover_image_querykey = "mdx-cover-" + props.src.get_id() + "-image";
    const cover_image_query = useQuery(cover_image_querykey, () => {
        return props.src.get_CoverImage_promise();
    }, {
        staleTime: 1000 * 60 * 5
    });
    if (cover_image_query.isLoading) {
        return (
            <Chakra.Skeleton
                borderTopLeftRadius={"10px"}
                borderBottomLeftRadius={"10px"}
                height={"full"}
            />
        );
    }
    if (cover_image_query.isError) {
        return (<Chakra.Image
            src={Mangadex_cover_not_found}
            fallbackSrc={Mangadex_placeHolder}
            borderTopLeftRadius={"10px"}
            borderBottomLeftRadius={"10px"}
        />)
    }
    return (
        <Chakra.Image
            src={cover_image_query.data!}
            fallbackSrc={Mangadex_placeHolder}
            borderTopLeftRadius={"10px"}
            borderBottomLeftRadius={"10px"}
        />
    );
}
