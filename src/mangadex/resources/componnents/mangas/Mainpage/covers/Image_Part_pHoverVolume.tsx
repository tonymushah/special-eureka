import { Cover } from "@mangadex/api/structures/Cover";
import CoverImage from "@mangadex/resources/componnents/covers/v1/CoverImage";
import React from "react";
import { OtherComp } from "./OtherComp";

export function Image_Part_pHoverVolume(props: {
    cover: Cover;
}) {
    return (
        <CoverImage
            src={props.cover}
            other_comp={OtherComp} />
    );
}
