import { HStack, Button } from "@chakra-ui/react";
import { useStoryBookRTLSwipperMode } from "../../hooks/user-option/RTLMode";

export default function RtlSwitch() {
    const rtl_mode = useStoryBookRTLSwipperMode({
        initialData: false
    });
    return (
        <HStack spacing={1}>
            <Button isDisabled={rtl_mode.query.data == false} onClick={rtl_mode.toggle}>Left To Right</Button>
            <Button isDisabled={rtl_mode.query.data == true} onClick={rtl_mode.toggle}>Right to Left</Button>
        </HStack>
    );
}