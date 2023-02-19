import React from "react";
import * as Chakra from "@chakra-ui/react"
import haikei_red from "../../resources/haikei/layered-waves-haikei-red.svg";
import haikei_blue from "../../resources/haikei/layered-waves-haikei-blue.svg";
import haikei_violet from "../../resources/haikei/layered-waves-haikei-violet.svg";
export default function Home() {
    return (
        <React.Fragment>
            <Chakra.Box
                backgroundImage={haikei_red}
                backgroundPosition={"bottom"}
                backgroundSize={"cover"}
                backgroundRepeat={"no-repeat"}
                width={"100%"}
                height={"25em"}
            >
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
                    height={"25em"}
                >
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
                    height={"25em"}
                >
                </Chakra.Box>
            </Chakra.Box>
        </React.Fragment>
    )
}