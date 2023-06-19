import React from "react";
import * as Chakra from "@chakra-ui/react";
import Mangadex_placeHolder from "../../../imgs/cover-placeholder.png";

export default function MangaFallback2() {
    const card_maxHeight: Chakra.ResponsiveValue<any> = {
        base: "10em"
    };
    return (
        <Chakra.Card maxHeight={card_maxHeight} direction={"row"} overflowY={"hidden"} minWidth={"sm"}>
            <Chakra.Image
                src={Mangadex_placeHolder}
                maxHeight={card_maxHeight}
                objectFit="contain"
            />
            <Chakra.CardBody marginTop={"0px"}>
                <Chakra.Stack>
                        <Chakra.Skeleton
                            height={"30px"}
                        />
                    
                    <Chakra.SkeletonText
                        spacing={"3"}
                        noOfLines={3}
                        skeletonHeight={"20px"}
                        speed={0.8}
                    />
                </Chakra.Stack>

            </Chakra.CardBody>
        </Chakra.Card>
    );
}
