import { useProps } from "../v1/MangaElementDef/vanilla/Props";
import { Manga__Download_Update_Button } from "./Manga__Download_Update_Button";
import { Manga__Delete_Update_Button } from "./Manga__Delete_Update_Button";
import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import React from "react";

const ExtLink = React.lazy(async () => {
    const res = await import("@commons-res/components/ExtLink");
    return {
        default: res.ExtLink
    };
});


export default function ButtonGroup__() {
    const { src } = useProps();
    return (
        <Chakra.ButtonGroup>
            <React.Suspense
                fallback={
                    <Chakra.Button
                        isLoading
                        colorScheme={"orange"}
                        loadingText={"Loading..."}
                    />
                }
            >
                <ExtLink
                    href={"https://mangadex.org/title/" + src.get_id()}
                >
                    <Chakra.Button
                        colorScheme={"orange"}
                        rightIcon={<ChakraIcons.ExternalLinkIcon />}
                    >
                        Open to Mangadex
                    </Chakra.Button>
                </ExtLink>
            </React.Suspense>
            <Manga__Download_Update_Button manga_id={src.get_id()} />
            <Manga__Delete_Update_Button manga_id={src.get_id()} />
        </Chakra.ButtonGroup>
    );
}