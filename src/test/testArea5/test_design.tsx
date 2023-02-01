import * as Chakra from "@chakra-ui/react";
import { getClient } from "@tauri-apps/api/http";
import React from "react";
import ReactDOM from "react-dom/client";
import { Composition } from "remotion";
import TryCatch from "../../commons-res/components/TryCatch";
import Api_Request from "../../mangadex/api/offline/DeskApiRequest";
import { Manga } from "../../mangadex/api/structures/Manga";
const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);

console.log("daisuhiddh")
const client = await getClient();
try {
    const data = await Manga.getAllDownloadedMangaID();
    test_area.render(
    <Chakra.ChakraProvider>
        <TryCatch
            catch={(error : Error) => (
                <Chakra.Alert status="error">
                    <Chakra.AlertIcon/>
                    <Chakra.AlertTitle>{error.name}</Chakra.AlertTitle>
                    <Chakra.AlertDescription>{error.message}</Chakra.AlertDescription>
                </Chakra.Alert>
            )}
        >
            {
                JSON.stringify(data)
            }
        </TryCatch>
        
    </Chakra.ChakraProvider>
)
} catch (error) {
    console.log(error);
}


