import * as Chakra from "@chakra-ui/react";
import { ThLargeTabPanel } from "./ThLargeTabPanel";
import { ThListTabPanel } from "./ThListTabPanel";
import { ThTabPanel } from "./ThTabPanel";

export default function TabPanels() {
    return (
        <Chakra.TabPanels textAlign={"start"}>
            <ThListTabPanel />
            <ThLargeTabPanel />
            <ThTabPanel/>
        </Chakra.TabPanels>
    );
}