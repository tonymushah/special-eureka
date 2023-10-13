import React from "react";
import Mangadex_cover_not_found from "@mangadex/resources/imgs/cover-not-found.jpg";
import Mangadex_placeHolder from "@mangadex/resources/imgs/cover-placeholder.png";
import { Box, useColorModeValue } from "@chakra-ui/react";
import get_manga_page_cover_art_image from "@mangadex/resources/hooks/MangaStateHooks/get_manga_page_cover_art_image";
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
    const bgGradient = useColorModeValue(
        "linear(to-b,rgba(255, 255,255, 0.2) 0%, rgba(255,255,255, 0.5) 50%, rgba(255,255,255, 1) 100%)", 
        "linear(to-b,rgba(26, 32, 44, 0.2) 0%, rgba(26, 32, 44, 0.5)  50%, rgba(26, 32, 44, 1)  100%)"
    );
    const backdropBrightness = useColorModeValue(
        "1.1",
        "0.7"
    );
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
                backdropBrightness={backdropBrightness}
                backdropContrast={"1.2"}
            >
                <Box
                    padding={5}
                    bgGradient={bgGradient}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}