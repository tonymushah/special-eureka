import { Box } from "@chakra-ui/react";
import { useProps } from ".";

export default function Laoyut({ children }: React.PropsWithChildren) {
    const props = useProps();
        return (
            <Box
                marginBottom={2}
                width={"min-content"}
                height={{
                    base: "min-content",
                    md: "initial"
                }}
                textAlign={"start"}
                boxSize={"min-content"}
                borderStyle={"solid"}
                border={"1px"}
                borderColor={"#cacaca"}
                backgroundColor={props.isRefetching == undefined ? (
                    props.src.get_status() == "ongoing" ? "green.100" : (
                        props.src.get_status() == "completed" ? "blue.100" : (
                            props.src.get_status() == "hiatus" ? "orange.100" : (
                                props.src.get_status() == "cancelled" ? "red.100" : "gray.100"
                            )
                        )
                    )
                ) : (props.isRefetching ? "yellow.100" : (
                    props.src.get_status() == "ongoing" ? "green.100" : (
                        props.src.get_status() == "completed" ? "blue.100" : (
                            props.src.get_status() == "hiatus" ? "orange.100" : (
                                props.src.get_status() == "cancelled" ? "red.100" : "gray.100"
                            )
                        )
                    )
                ))}
                borderRadius={"10px"}
                _hover={{
                    backgroundColor: (
                        props.isRefetching == undefined ? (
                            props.src.get_status() == "ongoing" ? "green.200" : (
                                props.src.get_status() == "completed" ? "blue.200" : (
                                    props.src.get_status() == "hiatus" ? "orange.200" : (
                                        props.src.get_status() == "cancelled" ? "red.200" : "gray.200"
                                    )
                                )
                            )
                        ) : (props.isRefetching ? "yellow.200" : (
                            props.src.get_status() == "ongoing" ? "green.200" : (
                                props.src.get_status() == "completed" ? "blue.200" : (
                                    props.src.get_status() == "hiatus" ? "orange.200" : (
                                        props.src.get_status() == "cancelled" ? "red.200" : "gray.200"
                                    )
                                )
                            )
                        ))
                    )
                }}
                boxShadow={"md"}
            >
                {children}
            </Box>
        );
    }