import Mangadex_cover_not_found from "@mangadex/resources/imgs/cover-not-found.jpg";
import Mangadex_placeHolder from "@mangadex/resources/imgs/cover-placeholder.png";
import { useProps_manga_page_cover_art_image } from ".";
import { Image } from "@chakra-ui/react";

import { FallBackImage } from "../../MangaElementFallback/FallBackImage";
import { motion } from "framer-motion";

export default function CoverImage() {
    const coverQuery = useProps_manga_page_cover_art_image();
    if (coverQuery.isSuccess) {
        return (
            <Image
                as={motion.img}
                src={coverQuery.data}
                fallback={<FallBackImage/>}
                height={"160px"}
                objectFit={"cover"}
                // layoutId={coverQuery.data}
            />
        );
    } else if (coverQuery.isError) {
        return (
            <Image
                src={Mangadex_cover_not_found}
                fallback={<FallBackImage/>}
                height={"160px"}
                objectFit={"cover"}
            />
        );
    } else if (coverQuery.isFetching) {
        return (
            <Image
                src={Mangadex_placeHolder}
                fallback={<FallBackImage/>}
                height={"160px"}
                objectFit={"cover"}
            />
        );
    } else if (coverQuery.isLoading) {
        return (
            <FallBackImage/>
        );
    } else {
        return (
            <Image
                src={Mangadex_placeHolder}
                fallback={<FallBackImage/>}
                height={"160px"}
                objectFit={"cover"}
            />
        );
    }
}