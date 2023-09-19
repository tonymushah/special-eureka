import * as Chakra from "@chakra-ui/react";
import MyErrorBounderies from "@mangadex/resources/componnents/error/MyErrorBounderies";
import { FaThListTabPanel } from "./FaThListTabPanel";
import { FaThLargeTabPanel } from "./FaThLargeTabPanel";
import { FaThTabPanel } from "./FaThTabPanel";

export function TabPanels() {
    return (
        <Chakra.TabPanels padding={"2px"}>
            <Chakra.TabPanel padding={"5px"}>
                <MyErrorBounderies>
                    <FaThListTabPanel />
                </MyErrorBounderies>
            </Chakra.TabPanel>
            <Chakra.TabPanel padding={"2px"}>
                <MyErrorBounderies>
                    <FaThLargeTabPanel />
                </MyErrorBounderies>
            </Chakra.TabPanel>
            <Chakra.TabPanel padding={"2px"} textAlign={"center"}>
                <MyErrorBounderies>
                    <FaThTabPanel />
                </MyErrorBounderies>
            </Chakra.TabPanel>
        </Chakra.TabPanels>
    );
}
