import { Box, useColorModeValue } from "@chakra-ui/react";
import { useProps } from ".";

export default function Laoyut({ children }: React.PropsWithChildren) {
    const props = useProps();
    const { ongoing, completed, hiatus, cancelled, none, onRefetching } = useBackGroundColor();
    const { ongoing: hover_ongoing, completed: hover_completed, hiatus: hover_hiatus, cancelled: hover_cancelled, none: hover_none, onRefetching: none_onRefetching } = useHoverBackGroundColor();
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
            backgroundColor={props.isRefetching == undefined ? (
                props.src.get_status() == "ongoing" ? ongoing : (
                    props.src.get_status() == "completed" ? completed : (
                        props.src.get_status() == "hiatus" ? hiatus : (
                            props.src.get_status() == "cancelled" ? cancelled : none
                        )
                    )
                )
            ) : (props.isRefetching ? onRefetching : (
                props.src.get_status() == "ongoing" ? ongoing : (
                    props.src.get_status() == "completed" ? completed : (
                        props.src.get_status() == "hiatus" ? hiatus : (
                            props.src.get_status() == "cancelled" ? cancelled : none
                        )
                    )
                )
            ))}
            borderRadius={"10px"}
            _hover={{
                backgroundColor: (
                    props.isRefetching == undefined ? (
                        props.src.get_status() == "ongoing" ? hover_ongoing : (
                            props.src.get_status() == "completed" ? hover_completed : (
                                props.src.get_status() == "hiatus" ? hover_hiatus : (
                                    props.src.get_status() == "cancelled" ? hover_cancelled : hover_none
                                )
                            )
                        )
                    ) : (props.isRefetching ? none_onRefetching : (
                        props.src.get_status() == "ongoing" ? hover_ongoing : (
                            props.src.get_status() == "completed" ? hover_completed : (
                                props.src.get_status() == "hiatus" ? hover_hiatus : (
                                    props.src.get_status() == "cancelled" ? hover_cancelled : hover_none
                                )
                            )
                        )
                    ))
                ),
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
