import { Box, Center, Image } from "@chakra-ui/react";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import React from "react";
import { HotkeyCallback } from "react-hotkeys-hook";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import NextPreviousHotKeys from "../../../SinglePage/Image/NextPreviousHotKeys";
import { useImageState } from "../../../SinglePage/Image/hooks";
//import { useStoryBookRTLSwipperMode } from "@mangadex/resources/storybook/hooks/user-option/RTLMode";
import useRTLSwipperMode from "@mangadex/resources/hooks/userOptions/RtlSwipperMode";

function ThisImage({ src }: {
    src: string
}) {
    return (
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
    );
}

export default function RealDoublePage({ src, onPrevious, onNext }: {
    src: [string, string],
    onPrevious?: HotkeyCallback,
    onNext?: HotkeyCallback
}) {
    React.useEffect(() => {
        if (src.length > 2) {
            throw new Error("The length of the input array should be <= 2");
        }
    }, []);
    // const rtlMode = useStoryBookRTLSwipperMode();
    const rtlMode = useRTLSwipperMode();
    const src_ = React.useMemo<[string, string]>(() => {
        if (rtlMode.query.data == true) {
            return [src[1], src[0]];
        } else {
            return src;
        }
    }, [rtlMode.query.data]);

    const { isDisabled, setIsDeZooming, setIsPanning, startTransition, setIsZooming, cursor, transformWarperRef } = useImageState();
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
                backgroundImage={`none, url(${src[0]}), url(${src[1]})`}
                backgroundPosition={"left, right"}
                backgroundSize={"contain, contain"}
            >
                <Box backdropFilter={"auto"} backdropBlur={"50px"} cursor={cursor}>
                    <TransformWrapper
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
                        doubleClick={{
                            disabled: true
                        }}
                        onZoom={(e) => {
                            startTransition(() => {
                                const scale = e.state.scale;
                                const previousScale = e.state.previousScale;
                                if (previousScale < scale) {
                                    setIsZooming(true);
                                    setIsDeZooming(false);
                                } else if (previousScale > scale) {
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
                                <ThisImage src={src_[0]} />
                                <ThisImage src={src_[1]} />
                            </Center>
                        </TransformComponent>
                    </TransformWrapper>
                </Box>
            </Box>
        </React.Fragment>
    );
}