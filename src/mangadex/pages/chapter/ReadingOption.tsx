import React from "react";
import { Chapter } from "../../api/structures/Chapter";
import { useFullScreenOptions, useFullScreenOptions_Query, FullScreenOptions_Context } from "./ChapterFullScreen/FullScreenOptionsProvider";
import * as Chakra from "@chakra-ui/react";
import * as ChakraIcons from "@chakra-ui/icons";
export default function ReadingOptions(props: {
    chapter: Chapter,
}) {
    const { query, updateOptions } = useFullScreenOptions_Query();
    const { isOpen, onOpen, onClose } = Chakra.useDisclosure();
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [isOverlay, state] = Chakra.useBoolean(true);
    const btnRef = React.useRef<HTMLButtonElement>();
    return (
        <React.Fragment>
                <Chakra.IconButton
                    aria-label="Reading Options"
                    colorScheme={"orange"}
                    icon={<ChakraIcons.HamburgerIcon />}
                    ref={btnRef}
                    onClick={onOpen}
                />
            <Chakra.Drawer
                isOpen={isOpen}
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                {
                    isOverlay == true ? (
                        <Chakra.DrawerOverlay
                            zIndex={"100"}
                        />
                    ) : (
                        <>
                        </>
                    )
                }
                <Chakra.DrawerContent zIndex={"100"}>
                    <Chakra.DrawerCloseButton />
                    <Chakra.DrawerHeader>
                        Reading Option
                    </Chakra.DrawerHeader>
                    <Chakra.DrawerBody>
                        <Chakra.Stack
                            spacing={"10px"}
                            direction="column"
                        >
                            <Chakra.Text>
                                Option Overlay :
                            </Chakra.Text>
                            <Chakra.Switch isChecked={isOverlay} onChange={() => {
                                state.toggle()
                            }} />
                        </Chakra.Stack>
                        <Chakra.Stack
                            spacing={"10px"}
                            direction="column"
                        >
                            <Chakra.Text>
                                Image width :
                            </Chakra.Text>
                            return (
                            <Chakra.Slider
                                id='slider'
                                defaultValue={query.data == undefined ? 0 : query.data.image_width}
                                min={0}
                                max={100}
                                colorScheme='teal'
                                onChange={(v) => {
                                    let new_option: FullScreenOptions_Context = query.data == undefined ? {
                                        image_width: 0
                                    } : query.data;
                                    new_option.image_width = v;
                                    updateOptions(new_option);
                                }}
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                            >
                                <Chakra.SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
                                    25%
                                </Chakra.SliderMark>
                                <Chakra.SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
                                    50%
                                </Chakra.SliderMark>
                                <Chakra.SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
                                    75%
                                </Chakra.SliderMark>
                                <Chakra.SliderTrack>
                                    <Chakra.SliderFilledTrack />
                                </Chakra.SliderTrack>
                                <Chakra.Tooltip
                                    hasArrow
                                    bg='teal.500'
                                    color='white'
                                    placement='top'
                                    isOpen={showTooltip}
                                    label={`${query.data == undefined ? 0 : query.data.image_width}%`}
                                >
                                    <Chakra.SliderThumb />
                                </Chakra.Tooltip>
                            </Chakra.Slider>
                        </Chakra.Stack>
                    </Chakra.DrawerBody>
                </Chakra.DrawerContent>
            </Chakra.Drawer>
        </React.Fragment>
    )
}