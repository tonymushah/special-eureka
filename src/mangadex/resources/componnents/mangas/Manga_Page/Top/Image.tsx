import get_manga_page_cover_art_image from "@mangadex/resources/hooks/MangaStateHooks/get_manga_page_cover_art_image";
import Mangadex_cover_not_found from "@mangadex/resources/imgs/cover-not-found.jpg";
import Mangadex_placeHolder from "@mangadex/resources/imgs/cover-placeholder.png";
import "flag-icons/css/flag-icons.min.css";
import React from "react";
import { Cover_Image_ } from "../../Mainpage/Image_";
import { useProps } from "../../v1/MangaElementDef/vanilla/Props";

export default function Image() {
    const { src } = useProps();
    const coverQuery = get_manga_page_cover_art_image({
        src
    }).query;
    const backgroundImage = React.useCallback(() => {
        if (coverQuery.isSuccess) {
            return coverQuery.data;
        } else if (coverQuery.isError) {
            return Mangadex_cover_not_found;
        } else {
            return Mangadex_placeHolder;
        }
    }, [
        coverQuery.data
    ]);
    return (
        <Cover_Image_ src={backgroundImage()} fallbackElement={Mangadex_placeHolder} />
    );
}