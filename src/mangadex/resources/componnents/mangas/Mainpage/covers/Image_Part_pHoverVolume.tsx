import { Cover } from "@mangadex/api/structures/Cover";
import CoverImage from "@mangadex/resources/componnents/covers/v1/CoverImage";
import React from "react";
import { CoverImageComp } from "./CoverImageComp";

export function Image_Part_pHoverVolume(props: {
    cover: Cover;
    setSelectedCover? : () => void;
}) {
    const OtherComp = React.useCallback((e : string) => {
        return (<CoverImageComp src={e} setSelectedCover={props.setSelectedCover} />);
    }, [props.setSelectedCover]);
    return (
        <CoverImage
            src={props.cover}
            other_comp={OtherComp} 
        />
    );
}
