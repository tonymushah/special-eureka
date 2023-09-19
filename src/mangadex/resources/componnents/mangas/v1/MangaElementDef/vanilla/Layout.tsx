import { Box, useColorModeValue } from "@chakra-ui/react";
import { useProps } from ".";
import React from "react";

export default function Laoyut({ children }: React.PropsWithChildren) {
    const { backgroundColor, _hover_background } = useLayoutBackGround();
    return (
        <Box
            marginBottom={2}
            width={"min-content"}
            height={"130px"}
            textAlign={"start"}
            boxSize={"min-content"}
            borderStyle={"solid"}
            border={"1px"}
            borderColor={"#cacaca"}
            backgroundColor={backgroundColor}
            borderRadius={"10px"}
            _hover={{
                backgroundColor: _hover_background,
                transitionProperty: "backgroundColor",
                transitionDuration: "0.3s",
                transitionTimingFunction: "ease-in-out"
            }}
            boxShadow={"md"}
            transitionProperty={"backgroundColor"}
            transitionDuration={"0.3s"}
            transitionTimingFunction={"ease-in-out"}
        >
            {children}
        </Box>
    );
}

function useLayoutBackGround(){
    const props = useProps();
    const { ongoing, completed, hiatus, cancelled, none, onRefetching } = useBackGroundColor();
    const { ongoing: hover_ongoing, completed: hover_completed, hiatus: hover_hiatus, cancelled: hover_cancelled, none: hover_none, onRefetching: none_onRefetching } = useHoverBackGroundColor();
    const backgroundColor = React.useMemo(() => {
        if (props.isRefetching == undefined) {
            if (props.src.get_status() == "ongoing") {
                return ongoing;
            } else if (props.src.get_status() == "completed") {
                return completed;
            } else if (props.src.get_status() == "hiatus") {
                return hiatus;
            } else if (props.src.get_status() == "cancelled") {
                return cancelled;
            } else {
                return none;
            }
        } else {
            if (props.isRefetching) {
                return onRefetching;
            } else {
                if (props.src.get_status() == "ongoing") {
                    return ongoing;
                } else if (props.src.get_status() == "completed") {
                    return completed;
                } else if (props.src.get_status() == "hiatus") {
                    return hiatus;
                } else if (props.src.get_status() == "cancelled") {
                    return cancelled;
                } else {
                    return none;
                }
            }
        }
    }, [props]);
    const _hover_background = React.useMemo(() => {
        if (props.isRefetching == undefined) {
            if (props.src.get_status() == "ongoing") {
                return hover_ongoing;
            } else if (props.src.get_status() == "completed") {
                return hover_completed;
            } else if (props.src.get_status() == "hiatus") {
                return hover_hiatus;
            } else if (props.src.get_status() == "cancelled") {
                return hover_cancelled;
            } else {
                return hover_none;
            }
        } else {
            if (props.isRefetching) {
                return none_onRefetching;
            } else {
                if (props.src.get_status() == "ongoing") {
                    return hover_ongoing;
                } else if (props.src.get_status() == "completed") {
                    return hover_completed;
                } else if (props.src.get_status() == "hiatus") {
                    return hover_hiatus;
                } else if (props.src.get_status() == "cancelled") {
                    return hover_cancelled;
                } else {
                    return hover_none;
                }
            }
        }
    }, [props]);
    return {
        backgroundColor,
        _hover_background
    };
}

function useBackGroundColor() {
    const ongoing = useColorModeValue("green.100", "green.900");
    const completed = useColorModeValue("blue.100", "blue.900");
    const hiatus = useColorModeValue("orange.100", "orange.900");
    const cancelled = useColorModeValue("red.100", "red.900");
    const none = useColorModeValue("gray.100", "gray.900");
    const onRefetching = useColorModeValue("yellow.100", "yellow.900");
    return { ongoing, completed, hiatus, cancelled, none, onRefetching };
}

function useHoverBackGroundColor() {
    const ongoing = useColorModeValue("green.200", "green.800");
    const completed = useColorModeValue("blue.200", "blue.800");
    const hiatus = useColorModeValue("orange.200", "orange.800");
    const cancelled = useColorModeValue("red.200", "red.800");
    const none = useColorModeValue("gray.200", "gray.800");
    const onRefetching = useColorModeValue("yellow.200", "yellow.800");
    return { ongoing, completed, hiatus, cancelled, none, onRefetching };
}
