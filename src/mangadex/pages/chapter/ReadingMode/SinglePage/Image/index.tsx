import { Box, Center, Image } from "@chakra-ui/react";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import { Property } from "csstype";
import React from "react";
import { HotkeyCallback, useHotkeys } from "react-hotkeys-hook";
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import NextPreviousHotKeys from "./NextPreviousHotKeys";

export default function ChapterImage({ src, onNext, onPrevious }: {
    src: string,
    onNext?: HotkeyCallback,
    onPrevious?: HotkeyCallback
}) {
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [isPanning, setIsPanning] = React.useState(false);
    const [isZooming, setIsZooming] = React.useState(false);
    const [, startTranstion] = React.useTransition();
    const transformWarperRef = React.createRef<ReactZoomPanPinchRef>();
    useHotkeys("x", () => {
        transformWarperRef.current?.resetTransform();
    });
    const cursor = React.useMemo<Property.Cursor>(() => {
        if (isDisabled) {
            return "not-allowed";
        } else {
            if (isPanning == true) {
                return "grabbing";
            } else if (isZooming == true) {
                return "zoom-in";
            } else {
                return "grab";
            }
        }
    }, [isDisabled, isPanning, isZooming]);
    useHotkeys("ctrl", () => {
        setIsDisabled(!isDisabled);
    }, [isDisabled]);
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
                        initialScale={1}
                        centerOnInit
                        disablePadding={false}
                        ref={transformWarperRef}
                        disabled={isDisabled}
                        panning={{
                            disabled: isDisabled
                        }}
                        onPanningStart={() => {
                            startTranstion(() => {
                                setIsPanning(true);
                            });
                        }}
                        onPanningStop={() => {
                            startTranstion(() => {
                                setIsPanning(false);
                            });
                        }}
                        onZoomStart={() => {
                            startTranstion(() => {
                                setIsZooming(true);
                            });
                        }}
                        onZoomStop={() => {
                            startTranstion(() => {
                                setIsZooming(false);
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