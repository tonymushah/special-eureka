import * as Chakra from "@chakra-ui/react";
import React from "react";
import get_cover_art_byId from "../../../hooks/CoverStateHooks";
import Mangadex_cover_not_found from "../../../imgs/cover-not-found.jpg";
import Mangadex_placeHolder from "../../../imgs/cover-placeholder.png";

const CoverImage = React.lazy(() => import("./CoverImage"));

export default function CoverImageByCoverID(props: {
    coverID: string,
    isThumbail?: boolean,
    size?: 256 | 512,
    image_props?: Chakra.ImageProps
}) {
    const {
        coverQuery
    } = get_cover_art_byId({
        coverID : props.coverID
    })
    if (coverQuery.isSuccess) {
        return (
            <React.Suspense
                fallback={
                    <Chakra.Image
                        src={Mangadex_placeHolder}
                        {...props.image_props}
                    />
                }
            >
                <CoverImage
                    src={coverQuery.data}
                    isThumbail={props.isThumbail}
                    size={props.size}
                    image_props={props.image_props}
                />
            </React.Suspense>
        )
    }
    if (coverQuery.isError) {
        return (
            <Chakra.Image
                src={Mangadex_cover_not_found}
                {...props.image_props}
            />
        )
    }
    return (
        <Chakra.Image
            src={Mangadex_placeHolder}
            {...props.image_props}
        />
    )
}