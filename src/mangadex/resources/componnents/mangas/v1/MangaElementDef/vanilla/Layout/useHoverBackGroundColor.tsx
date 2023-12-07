import { useColorModeValue } from "@chakra-ui/react";


export function useHoverBackGroundColor() {
    const ongoing = useColorModeValue("green.200", "green.800");
    const completed = useColorModeValue("blue.200", "blue.800");
    const hiatus = useColorModeValue("orange.200", "orange.800");
    const cancelled = useColorModeValue("red.200", "red.800");
    const none = useColorModeValue("gray.200", "gray.800");
    const onRefetching = useColorModeValue("yellow.200", "yellow.800");
    return { ongoing, completed, hiatus, cancelled, none, onRefetching };
}
