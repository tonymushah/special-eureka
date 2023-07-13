import "@commons-res/fonts";
import ReactDOM from "react-dom/client";
import { Box, Center, ChakraProvider, Heading, Image, Tooltip } from "@chakra-ui/react";
import viteIco from "@commons-res/common-icon/favicon.svg";
import tauriIco from "@commons-res/common-icon/tauri.svg";
import appIcon from "@commons-res/common-icon/eureka-logo6.svg";
import reactIcon from "@commons-res/common-icon/React-icon.svg";
import theme from "@/theme";


ReactDOM.hydrateRoot(document.getElementById("root")!, (
    <ChakraProvider theme={theme}>
        <Box width={"100%"} height={"100vh"} backdropFilter={"auto"} backdropBlur={"10px"}>
            <Box>
                <Box >
                    <Center>
                        <Image
                            src={appIcon}
                            width={"250px"}
                            height={"250px"}
                        />
                    </Center>
                </Box>
                <Box>
                    <Center>
                        <Heading size={"2xl"}>Special Eureka</Heading>
                    </Center>
                </Box>
                <Box>
                    <Box>
                        <Heading size="lg" textAlign={"center"}>Powered with</Heading>
                        <Center margin={2}>
                            <Tooltip hasArrow placement="bottom" label="Vite">
                                <Image
                                    src={viteIco}
                                    width={"40px"}
                                    height={"40px"}
                                />
                            </Tooltip>
                            <Tooltip hasArrow placement="bottom" label="Tauri">
                                <Image
                                    src={tauriIco}
                                    width={"40px"}
                                    height={"40px"}
                                />
                            </Tooltip>
                            <Tooltip hasArrow placement="bottom" label="React">
                                <Image
                                    src={reactIcon}
                                    width={"40px"}
                                    height={"40px"}
                                />
                            </Tooltip>
                        </Center>
                    </Box>
                </Box>
            </Box>
        </Box>
    </ChakraProvider>
));
