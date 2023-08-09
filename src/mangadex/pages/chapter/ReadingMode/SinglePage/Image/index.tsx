import { Box, Center, Icon, Image } from "@chakra-ui/react";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import React from "react";
import { HotkeyCallback, useHotkeys } from "react-hotkeys-hook";
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import NextPreviousHotKeys from "./NextPreviousHotKeys";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";
import { TbZoomCancel, TbZoomCheck } from "react-icons/tb";

export default function ChapterImage({ src, onNext, onPrevious }: {
    src: string,
    onNext?: HotkeyCallback,
    onPrevious?: HotkeyCallback
}) {
    const [isDisabled, setIsDisabled] = React.useState(true);
    const toast = useChakraToast({
        id : "zoom-toast",
        position : "top",
        duration : 5000,
        isClosable : true
    });
    const transformWarperRef = React.createRef<ReactZoomPanPinchRef>();
    useHotkeys("x", () => {
        transformWarperRef.current?.resetTransform();
    });
    useHotkeys("ctrl", () => {
        setIsDisabled(!isDisabled);
    }, [isDisabled]);
    React.useEffect(() => {
        if(isDisabled){
            toast({
                icon : (<Icon as={TbZoomCancel}/>),
                title : "The zoom is now disabled",
                status : "warning",
            });
        }else{
            toast({
                icon : (<Icon as={TbZoomCheck}/>),
                title : "The zoom is now enabled",
                status : "success"
            });
        }
    }, [isDisabled]);
    return (
        <React.Fragment>
            {
                isDisabled ? (
                    <NextPreviousHotKeys onNext={onNext} onPrevious={onPrevious} />
                ) : (
                    <React.Fragment/>
                )
            }
            <Box
                key={src}
                backgroundImage={src}
            >
                <Box backdropFilter={"auto"} backdropBlur={"50px"}>
                    <TransformWrapper
                        initialScale={1}
                        centerOnInit
                        disablePadding={false}
                        ref={transformWarperRef}
                        disabled={isDisabled}
                        panning={{
                            disabled : isDisabled
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