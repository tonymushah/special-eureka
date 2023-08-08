import { Box, Center, Image } from "@chakra-ui/react";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import React from "react";
import { RefType } from "react-hotkeys-hook/dist/types";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

export default function ChapterImage({ previous_next_ref, src }: {
    src: string,
    previous_next_ref: React.MutableRefObject<RefType<HTMLDivElement>>
}) {
    return (
        <Box
            key={src}
            backgroundImage={src}
            ref={previous_next_ref}
        >
            <Box backdropFilter={"auto"} backdropBlur={"25px"}>
                <TransformWrapper
                    initialScale={1}
                    centerOnInit
                    disablePadding={false}
                >
                    <TransformComponent
                        contentStyle={{
                            display: "block",
                            width: "max-content",
                            height: "max-content",
                        }}
                        wrapperStyle={{
                            width: "max-content",
                            height: "fit-content",
                            maxHeight : "100vh"
                        }}
                    >
                        <Center>
                            <Image
                                fallback={
                                    <Box width={"full"}>
                                        <Center>
                                            <MangadexSpinner
                                                size={"xl"}
                                                color={"orange"}
                                                thickness={"10px"}
                                            />
                                        </Center>
                                    </Box>
                                }
                                src={src}
                                alt={src}
                                height={"100vh"}
                            />
                        </Center>
                    </TransformComponent>
                </TransformWrapper>
            </Box>
        </Box>
    );
}