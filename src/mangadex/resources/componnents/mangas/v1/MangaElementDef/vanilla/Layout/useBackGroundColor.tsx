import { useColorModeValue } from "@chakra-ui/react";


export function useBackGroundColor() {
    const ongoing = useColorModeValue("green.100", "green.900");
    const completed = useColorModeValue("blue.100", "blue.900");
    const hiatus = useColorModeValue("orange.100", "orange.900");
    const cancelled = useColorModeValue("red.100", "red.900");
    const none = useColorModeValue("gray.100", "gray.900");
    const onRefetching = useColorModeValue("yellow.100", "yellow.900");
    return { ongoing, completed, hiatus, cancelled, none, onRefetching };
}
