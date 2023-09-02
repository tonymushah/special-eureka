import * as Chakra from "@chakra-ui/react";
import { get_manga_page_cover_art_image } from "@mangadex/resources/hooks/MangaStateHooks/get_manga_page_cover_art_image";
import CoverPlaceHolder from "@mangadex/resources/imgs/cover-placeholder.png";
import React from "react";
import { useProps } from "../../MangaElementDef/vanilla";


export default function Layout(props: React.PropsWithChildren) {
    const { src } = useProps();
    const coverQuery = get_manga_page_cover_art_image({
        src,
        isThumbail: true
    }).query;
    const background = Chakra.useColorModeValue("rgba(255, 255,255, 0.5)", "rgba(26, 32, 44, 0.5)");
    const backdropBrightness = Chakra.useColorModeValue("1.1", "0.9");
    return (
        <Chakra.Card
            backgroundImage={{ base: "none", lg: coverQuery.isSuccess == true ? coverQuery.data : CoverPlaceHolder }}
            backgroundRepeat={"no-repeat"}
            backgroundSize={"cover"}
            backgroundPosition={"0px -400px"}
            minW={"md"}
            margin={5}
        >
            <Chakra.Card
                background={background}
                backdropFilter='auto'
                backdropBlur={"20px"}
                backdropBrightness={backdropBrightness}
                direction={"row"}
                variant={"outline"}
            >
                {
                    props.children
                }
            </Chakra.Card>
        </Chakra.Card>
    );
}