import { Box, Center, Image } from "@chakra-ui/react";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import React from "react";
import { HotkeyCallback } from "react-hotkeys-hook";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import NextPreviousHotKeys from "./NextPreviousHotKeys";
import { useImageState } from "./hooks";

type SinglePageProps = {
    src: string;
    onNext?: HotkeyCallback;
    onPrevious?: HotkeyCallback;
};

export default function ChapterImage({ src, onNext, onPrevious }: SinglePageProps) {
    const { isDisabled, setIsDeZooming, setIsPanning, startTransition, setIsZooming, cursor, transformWarperRef} = useImageState();
    return (
        <React.Fragment>
            {
                isDisabled ? (
                    <NextPreviousHotKeys onNext={onNext} onPrevious={onPrevious} />
                ) : (
                    <React.Fragment />
                )
            }
            <Box
                key={src}
                backgroundImage={src}
            >
                <Box backdropFilter={"auto"} backdropBlur={"50px"} cursor={cursor}>
                    <TransformWrapper
                        doubleClick={{
                            disabled : true
                        }}
                        initialScale={1}
                        centerOnInit
                        disablePadding={false}
                        ref={transformWarperRef}
                        disabled={isDisabled}
                        panning={{
                            disabled: isDisabled
                        }}
                        onPanningStart={() => {
                            startTransition(() => {
                                setIsPanning(true);
                            });
                        }}
                        onPanningStop={() => {
                            startTransition(() => {
                                setIsPanning(false);
                            });
                        }}
                        onZoom={(e) => {
                            startTransition(() => {
                                const scale = e.state.scale;
                                const previousScale = e.state.previousScale;
                                if(previousScale < scale){
                                    setIsZooming(true);
                                    setIsDeZooming(false);
                                }else if(previousScale > scale){
                                    setIsZooming(false);
                                    setIsDeZooming(true);
                                }
                            });
                        }}
                        
                        onZoomStop={() => {
                            startTransition(() => {
                                setIsZooming(false);
                                setIsDeZooming(false);
                            });
                        }}
                    >
                        <TransformComponent
                            contentStyle={{
                                display: "block",
                                width: "100%",
                                height: "max-content",
                            }}
                            wrapperStyle={{
                                width: "100%",
                                height: "fit-content",
                                maxHeight: "100vh"
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
        </React.Fragment>
    );
}