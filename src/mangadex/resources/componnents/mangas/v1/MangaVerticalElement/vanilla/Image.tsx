import { get_manga_page_cover_art_image } from "@mangadex/resources/hooks/MangaStateHooks";
import { useProps } from "../../MangaElementDef/vanilla";
import * as Chakra from "@chakra-ui/react";
import Mangadex_cover_not_found from "@mangadex/resources/imgs/cover-not-found.jpg";
import Mangadex_placeHolder from "@mangadex/resources/imgs/cover-placeholder.png";

export default function Image() {
    const { src } = useProps();
    const coverQuery = get_manga_page_cover_art_image({
        src: src,
        isThumbail: true
    }).query;
    if (coverQuery.isSuccess) {
        return (
            <Chakra.Image
                src={coverQuery.data}
                fallbackSrc={Mangadex_placeHolder}
                borderTopRadius={"10px"}
            />
        );
    } else if (coverQuery.isError) {
        return (
            <Chakra.Image
                src={Mangadex_cover_not_found}
                fallbackSrc={Mangadex_placeHolder}
                borderTopRadius={"10px"}
            />
        );
    } else {
        return (
            <Chakra.Skeleton
                borderTopRadius={"10px"}
                height={"150px"}
            />
        );
    }
}
