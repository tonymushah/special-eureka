import { HStack, Switch, Text } from "@chakra-ui/react";
import { atom, useAtom } from "jotai";

export const OptionOverlayAtom = atom(false);

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