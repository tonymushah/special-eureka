import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import React from "react";
export default function FullScreenOptions(props: {
    isShow: boolean,
    onCloseButtonClick: () => void
}) {
    if(props.isShow == true){
        return (
            <React.Fragment>
                <Chakra.Box position={"fixed"}
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
                            props.onCloseButtonClick()
                        }}
                    />
                </Chakra.Box>
            </React.Fragment>
        )
    }
    return (
        <></>
    )
}