import { Card, CardBody, CardHeader, Collapse, Heading, StackDivider, VStack, useDisclosure } from "@chakra-ui/react";
import { useTrackEvent } from "@mangadex/index";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";
import FilterCollapse from "./FilterCollapse";
import MangaResult from "./Result";
import Title from "./Title";

export default function Manga_Search() {
    const { isOpen, onToggle } = useDisclosure();

    React.useEffect(() => {
        appWindow.setTitle("Manga Search | Mangadex");
    }, []);
    useTrackEvent("mangadex-manga-search");
    return (
        <Card>
            <CardHeader>
                <Heading fontFamily={"inherit"}>Advanced Search</Heading>
                <ChakraContainer>
                    <VStack divider={<StackDivider />}>
                        <Title onToggle={onToggle} />
                        <Collapse in={isOpen} animateOpacity>
                            <FilterCollapse />
                        </Collapse>
                    </VStack>
                </ChakraContainer>
            </CardHeader>
            <CardBody>
                <MangaResult/>
            </CardBody>
        </Card>
    );
}