import { Card, CardBody, CardHeader, Collapse, Heading, StackDivider, VStack, useDisclosure } from "@chakra-ui/react";
import { useTrackEvent } from "@mangadex/index";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";
import FilterCollapse from "./FilterCollapse";
import MangaResult from "./Result";
import Title from "./Title";

function Title_P_Collapse() {
    const { isOpen, onToggle } = useDisclosure();
    return (
        <React.Fragment>
            <Title onToggle={onToggle} />
            <Collapse in={isOpen} animateOpacity>
                <FilterCollapse />
            </Collapse>
        </React.Fragment>
    );
}

export default function Manga_Search() {


    React.useEffect(() => {
        appWindow.setTitle("Manga Search | Mangadex");
    }, []);
    useTrackEvent("mangadex-manga-search");
    return (
        <Card padding={"10px"}>
            <CardHeader>
                <Heading fontFamily={"inherit"}>Advanced Search</Heading>
                <ChakraContainer>
                    <VStack divider={<StackDivider />}>
                        <Title_P_Collapse/>
                    </VStack>
                </ChakraContainer>
            </CardHeader>
            <CardBody padding={"3px"}>
                <MangaResult />
            </CardBody>
        </Card>
    );
}