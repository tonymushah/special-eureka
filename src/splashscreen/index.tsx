import theme from "@/theme";
import { ChakraProvider, Image } from "@chakra-ui/react";
import "@commons-res/fonts";
import { tauriColorModeManager } from "@commons-res/theme";
import ReactDOM from "react-dom/client";
import banner from "../../banners/v0.1.6.jpg";

const rootElement = document.getElementById("root");

if (rootElement != undefined) {
    const root = ReactDOM.createRoot(rootElement);
    root.render((
        <ChakraProvider theme={theme} colorModeManager={tauriColorModeManager}>
            <Image
                src={banner}
            />
        </ChakraProvider>
    ));
}
