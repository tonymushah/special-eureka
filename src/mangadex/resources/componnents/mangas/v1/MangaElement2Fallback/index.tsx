import * as Chakra from "@chakra-ui/react";
import React from "react";

function FallBackImage({ card_maxHeight }: {
    card_maxHeight: Chakra.ResponsiveValue<string>
}) {
    return (
        <Chakra.Skeleton
            width={"6em"}
            maxHeight={card_maxHeight}
        />
    );
}

export default function MangaFallback2() {
    const card_maxHeight: Chakra.ResponsiveValue<string> = React.useMemo(() => ({
        base: "11em"
    }), []);
    return (
        <Chakra.Card
            maxHeight={card_maxHeight}
            cursor={"wait"}
            direction={"row"}
            overflowY={"hidden"}
            minWidth={"sm"}
        >
            <FallBackImage card_maxHeight={card_maxHeight} />
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
