import * as Chakra from "@chakra-ui/react";
import TauriQueryImage from "@commons-res/components/TauriQueryImage";
import get_manga_page_cover_art_image from "@mangadex/resources/hooks/MangaStateHooks/get_manga_page_cover_art_image";
import CoverPlaceHolder from "@mangadex/resources/imgs/cover-placeholder.png";
import { useProps } from "../../MangaElementDef/vanilla/Props";

export default function CoverImage() {
    const { src } = useProps();
    const coverQuery = get_manga_page_cover_art_image({
        src,
        isThumbail: true
    }).query;
    if (coverQuery.isSuccess) {
        return (
            <TauriQueryImage
                src={coverQuery.data}
                objectFit={"cover"}
                maxW={"200px"}
                margin={"10px"}
                boxShadow={"lg"}
                borderRadius={"10px"}
                fallbackSrc={CoverPlaceHolder}
            />
        );
    } else {
        return (
            <Chakra.Image
                src={CoverPlaceHolder}
                objectFit={"cover"}
                maxW={"200px"}
                margin={"10px"}
                boxShadow={"lg"}
                borderRadius={"10px"}
            />
        );

    }
}