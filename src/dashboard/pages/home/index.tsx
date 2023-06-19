import * as Chakra from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import haikei_blue from "@dashboard/resources/haikei/layered-waves-haikei-blue.svg";
import haikei_red from "@dashboard/resources/haikei/layered-waves-haikei-red.svg";
import haikei_violet from "@dashboard/resources/haikei/layered-waves-haikei-violet.svg";
import haikei_yellow from "@dashboard/resources/haikei/layered-waves-haikei-yellow.svg";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";
import Contacts from "./Contacts";
import CurrentlySupportedWebsites from "./CurrentlySupportedWebsite";
import DevNotes from "./DevNotes";
import PoweredBy from "./PoweredBy";
import Welcome from "./Welcome";
import { useTrackEvent } from "@dashboard";

export default function Home() {
    appWindow.setTitle("Welcome to Special-Eureka | Dashboard").then();
    useTrackEvent("dashboard-entrance");
    return (
        <React.Fragment>
            <Chakra.Box
                backgroundImage={haikei_red}
                backgroundPosition={"bottom"}
                backgroundSize={"cover"}
                backgroundRepeat={"no-repeat"}
                width={"100%"}
                minHeight={"25em"}
            >
                <Welcome/>
            </Chakra.Box>
            <Chakra.Box
                backgroundColor={"#bb004d"}
            >
                <Chakra.Box
                    backgroundImage={haikei_blue}
                    backgroundPosition={"bottom"}
                    backgroundSize={"cover"}
                    backgroundRepeat={"no-repeat"}
                    width={"100%"}
                    minHeight={"25em"}
                >
                    <CurrentlySupportedWebsites/>
                </Chakra.Box>
            </Chakra.Box>
            <Chakra.Box
                backgroundColor={"#004cbb"}
            >
                <Chakra.Box
                    backgroundImage={haikei_violet}
                    backgroundPosition={"bottom"}
                    backgroundSize={"cover"}
                    backgroundRepeat={"no-repeat"}
                    width={"100%"}
                    minHeight={"25em"}
                >
                    <DevNotes/>
                </Chakra.Box>
            </Chakra.Box>
            <Chakra.Box
                backgroundColor={"#b500ba"}
            >
                <Chakra.Box
                    backgroundImage={haikei_yellow}
                    backgroundPosition={"bottom"}
                    backgroundSize={"cover"}
                    backgroundRepeat={"no-repeat"}
                    width={"100%"}
                    minHeight={"25em"}
                >
                    <VStack spacing={"10"}>
                        <Contacts/>
                    <PoweredBy/>
                    </VStack>
                </Chakra.Box>
            </Chakra.Box>
        </React.Fragment>
    );
}