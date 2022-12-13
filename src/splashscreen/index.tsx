import React from "react";
import ReactDOM from "react-dom/client";
import { Box, Center, ChakraProvider, Heading, Image } from "@chakra-ui/react";
import viteIco from "../commons-res/common-icon/favicon.svg";
import tauriIco from "../commons-res/common-icon/tauri.svg";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
    <ChakraProvider
    >
        <Box
        >
            <Box margin={2}>
                <Box>
                    <Heading>Special Eureka</Heading>
                </Box>
                <Box>
                </Box>
                <Box>
                    <Box>
                        <Heading textAlign={"center"}>Powered with</Heading>
                        <Center>
                            <Image
                                src={viteIco}
                                width={"50px"}
                                height={"50px"}
                            />
                            <Image
                                src={tauriIco}
                                width={"50px"}
                                height={"50px"}
                            />
                        </Center>
                    </Box>
                </Box>
            </Box>
        </Box>
    </ChakraProvider>
)
