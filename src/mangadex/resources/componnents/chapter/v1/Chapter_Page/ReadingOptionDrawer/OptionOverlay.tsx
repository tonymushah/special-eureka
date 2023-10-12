import { HStack, Switch, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { OptionOverlayAtom } from "./OptionOverlayAtom";

export default function OptionOverlay() {
    const [ isOverlay, setIsOverlay ] = useAtom(OptionOverlayAtom);
    return (
        <HStack>
            <Text p={0} m={0}>
                Option Overlay :
            </Text>
            <Switch isChecked={isOverlay} onChange={() => {
                setIsOverlay(!isOverlay);
            }} />
        </HStack>
    );
}