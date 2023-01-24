import * as Chakra from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Composition } from "remotion";
import TryCatch from "../../commons-res/components/TryCatch";
const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);

//const to_use = Manga.getMangaByID("a82fe527-9e74-48d0-9c5f-a5e788c0bd4a");

function Simple_Component() {
    return (
        <Chakra.Heading>dsdhuasgdjbasd</Chakra.Heading>
    )
}


function MyComposition() {
    return (
        <>
            <Composition
                component={Simple_Component}
                durationInFrames={120}
                width={1920}
                height={1080}
                fps={30}
                id="my-comp"
                defaultProps={{ text: "World" }}
            />
        </>
    )
}

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
            <MyComposition />
        </TryCatch>
        
    </Chakra.ChakraProvider>
)