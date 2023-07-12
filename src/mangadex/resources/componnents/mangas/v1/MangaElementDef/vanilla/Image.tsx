import Mangadex_cover_not_found from "@mangadex/resources/imgs/cover-not-found.jpg";
import Mangadex_placeHolder from "@mangadex/resources/imgs/cover-placeholder.png";
import React from "react";
import { useProps_manga_page_cover_art_image } from ".";
import { Skeleton, Image } from "@chakra-ui/react";

export default function CoverImage() {
    const coverQuery = useProps_manga_page_cover_art_image();
    return (
        <React.Fragment>
            {
                coverQuery.isSuccess ? (<Image
                    src={coverQuery.data}
                    fallbackSrc={Mangadex_placeHolder}
                    borderTopLeftRadius={"10px"}
                    borderBottomLeftRadius={"10px"}
                />) : null
            }
            {
                coverQuery.isFetching ? (
                    <Image
                        src={Mangadex_placeHolder}
                        fallbackSrc={Mangadex_placeHolder}
                        borderTopLeftRadius={"10px"}
                        borderBottomLeftRadius={"10px"}
                    />
                ) : (
                    coverQuery.isLoading ? (<Skeleton
                        borderTopLeftRadius={"10px"}
                        borderBottomLeftRadius={"10px"}
                        height={"full"}
                    />) : null
                )
            }
            {
                coverQuery.isError ? (<Image
                    src={Mangadex_cover_not_found}
                    fallbackSrc={Mangadex_placeHolder}
                    borderTopLeftRadius={"10px"}
                    borderBottomLeftRadius={"10px"}
                />) : null
            }
        </React.Fragment>
    );
}