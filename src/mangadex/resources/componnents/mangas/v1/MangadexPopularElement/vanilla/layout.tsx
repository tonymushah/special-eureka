import * as Chakra from "@chakra-ui/react";
import { get_manga_page_cover_art_image } from "@mangadex/resources/hooks/MangaStateHooks";
import CoverPlaceHolder from "@mangadex/resources/imgs/cover-placeholder.png";
import React from "react";
import { useProps } from "../../MangaElementDef/vanilla";


export default function Layout(props: React.PropsWithChildren) {
    const { src } = useProps();
    const coverQuery = get_manga_page_cover_art_image({
        src,
        isThumbail: true
    }).query;
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
                background={"rgba(255, 255,255, 0.5)"}
                backdropFilter='auto'
                backdropBlur={"20px"}
                backdropBrightness={"1.1"}
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