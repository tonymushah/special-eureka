import get_manga_page_cover_art_image from "@mangadex/resources/hooks/MangaStateHooks/get_manga_page_cover_art_image";
import { useProps } from "../../MangaElementDef/vanilla/Props";
import FallBack from "../../MangaPopularElementFallback/Image";
import { Image } from "@chakra-ui/react";

export default function CoverImage() {
    const { src } = useProps();
    const coverQuery = get_manga_page_cover_art_image({
        src,
        isThumbail: true
    }).query;
    if (coverQuery.isSuccess) {
        return (
            <Image
                src={coverQuery.data}
                objectFit={"cover"}
                maxW={"200px"}
                margin={"10px"}
                boxShadow={"lg"}
                borderRadius={"10px"}
                fallback={<FallBack />}
            />
        );
    } else {
        return (
            <FallBack />
        );
    }
}
