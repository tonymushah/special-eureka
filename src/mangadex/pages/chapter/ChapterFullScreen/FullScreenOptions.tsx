import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import React from "react";

const FullScreenReadingOption = React.lazy(() => import("./FullScreenReadingOption"));

export default function FullScreenOptions(props: React.PropsWithChildren<{
    isShow: boolean,
    chapter: Chapter,
    onCloseButtonClick: () => void
}>) {
    const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure();
    const [hidden, setHidden] = React.useState(!isOpen);
    if (props.isShow == true) {
        return (
            <React.Fragment>
                <Chakra.Box
                    position={"fixed"}
                    zIndex={"banner"}
                    width={"100%"}
                >
                    <Chakra.IconButton
                        aria-label="Exit FullScreen"
                        colorScheme={"orange"}
                        opacity={"0.2"}
                        icon={<ChakraIcons.CloseIcon />}
                        float={"left"}
                        _hover={{
                            opacity: "1"
                        }}
                        onClick={() => {
                            props.onCloseButtonClick();
                        }}
                    />

                    <Chakra.IconButton aria-label="Reading Option"
                        colorScheme={"orange"}
                        opacity={"0.2"}
                        icon={<ChakraIcons.HamburgerIcon />}
                        float={"right"}
                        _hover={{
                            opacity: "1"
                        }} {...getButtonProps()} />
                </Chakra.Box>
                <React.Suspense>
                    <FullScreenReadingOption
                        isOpen={isOpen}
                        getDisclosureProps={getDisclosureProps}
                        hidden={hidden}
                        setHidden={setHidden}
                        chapter={props.chapter}
                    />
                </React.Suspense>
            </React.Fragment>
        );
    }
    return (
        <React.Fragment></React.Fragment>
    );
}