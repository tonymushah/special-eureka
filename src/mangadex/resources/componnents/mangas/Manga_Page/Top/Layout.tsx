import React from "react";
import Mangadex_cover_not_found from "@mangadex/resources/imgs/cover-not-found.jpg";
import Mangadex_placeHolder from "@mangadex/resources/imgs/cover-placeholder.png";
import { Box } from "@chakra-ui/react";
import { get_manga_page_cover_art_image } from "@mangadex/resources/hooks/MangaStateHooks";
import { useProps } from "../../v1/MangaElementDef/vanilla";

export default function Layout({ children }: React.PropsWithChildren) {
    const { src } = useProps();
    const coverQuery = get_manga_page_cover_art_image({
        src
    }).query;
    const backgroundImage = React.useCallback(() => {
        if(coverQuery.isSuccess){
            return coverQuery.data;
        }else if(coverQuery.isError){
            return Mangadex_cover_not_found;
        }else{
            return Mangadex_placeHolder;
        }
    },[
        coverQuery.data
    ]);
    return (
        <Box
            backgroundImage={backgroundImage()}
            backgroundRepeat={"no-repeat"}
            backgroundPosition={{
                sm: "0px -5em",
                md: "center -10em",
                lg: "center -20em",
                xl: "center -20em",
                "2xl": "center -20em",
            }}
            backgroundSize={"cover"}
            borderTopRadius={"10px"}
        >
            <Box
                backdropFilter='auto'
                backdropBlur={"20px"}
                backdropBrightness={"1.1"}
            >
                <Box
                    padding={5}
                    background={"rgba(255, 255,255, 0.2)"}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}