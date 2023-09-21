import Mangadex_cover_not_found from "@mangadex/resources/imgs/cover-not-found.jpg";
import Mangadex_placeHolder from "@mangadex/resources/imgs/cover-placeholder.png";
import { useProps_manga_page_cover_art_image } from ".";
import { Skeleton, Image } from "@chakra-ui/react";

export default function CoverImage() {
    const coverQuery = useProps_manga_page_cover_art_image();
    if (coverQuery.isSuccess) {
        return (
            <Image
                src={coverQuery.data}
                fallbackSrc={Mangadex_placeHolder}
                height={"full"}
                objectFit={"cover"}
            />
        );
    } else if (coverQuery.isError) {
        return (
            <Image
                src={Mangadex_cover_not_found}
                fallbackSrc={Mangadex_placeHolder}
                height={"full"}
                objectFit={"cover"}
            />
        );
    } else if (coverQuery.isFetching) {
        return (
            <Image
                src={Mangadex_placeHolder}
                fallbackSrc={Mangadex_placeHolder}
                height={"full"}
                objectFit={"cover"}
            />
        );
    } else if (coverQuery.isLoading) {
        return (
            <Skeleton
                height={"full"}
            />
        );
    } else {
        return (
            <Image
                src={Mangadex_placeHolder}
                fallbackSrc={Mangadex_placeHolder}
                height={"full"}
                objectFit={"cover"}
            />
        );
    }
}