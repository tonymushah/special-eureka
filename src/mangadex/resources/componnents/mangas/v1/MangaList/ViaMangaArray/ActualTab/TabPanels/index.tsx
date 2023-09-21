import * as Chakra from "@chakra-ui/react";
import MyErrorBounderies from "@mangadex/resources/componnents/error/MyErrorBounderies";
import { FaThLargeTabPanel } from "./FaThLargeTabPanel";
import { FaThListTabPanel } from "./FaThListTabPanel";
import { FaThTabPanel } from "./FaThTabPanel";

export function TabPanels() {
    return (
        <Chakra.TabPanels textAlign={"start"}>
            <Chakra.TabPanel
                padding={"5px"}
            >
                <MyErrorBounderies>
                    <FaThListTabPanel />
                </MyErrorBounderies>
            </Chakra.TabPanel>
            <Chakra.TabPanel
                padding={"5px"}
            >
                <MyErrorBounderies>
                    <FaThLargeTabPanel />
                </MyErrorBounderies>
            </Chakra.TabPanel>
            <Chakra.TabPanel
                padding={"5px"}
            >
                <MyErrorBounderies>
                    <FaThTabPanel/>
                </MyErrorBounderies>
            </Chakra.TabPanel>
        </Chakra.TabPanels>
    );
}