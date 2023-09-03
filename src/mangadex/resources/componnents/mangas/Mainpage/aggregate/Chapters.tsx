import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Alert, AlertIcon, AlertTitle, Box } from "@chakra-ui/react";
import { Chapters } from "@mangadex/api/structures/Chapter";
import Chapter_Element1_byChapID from "@mangadex/resources/componnents/chapter/v1/Chapter_Element1_byChapID";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import "@commons-res/flag-icons/less/flag-icons.less";
import React from "react";

type Chapters_ElementProps = {
    headersTitle: string
    children: React.ReactNode
}

function Chapters_Element(props: Chapters_ElementProps) {
    return (
        <ChakraContainer>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box flex='1' textAlign='left'>
                            {props.headersTitle}
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel>
                    {props.children}
                </AccordionPanel>
            </AccordionItem>
        </ChakraContainer>
    );
}

type ChaptersProps = {
    src: Chapters
}

export function ChaptersComp(props: React.PropsWithChildren<ChaptersProps>) {
    // NOTE Add isInView for performance
    if (props.src.get_count() == 1) {
        return (
            <React.Suspense fallback={
                <Alert status="loading" variant={"left-accent"}>
                    <AlertIcon/>
                    <AlertTitle>Initializing chapters...</AlertTitle>
                </Alert>
            }>
                {
                    props.src.get_ids().map((value, id) => (
                        <Chapter_Element1_byChapID key={`----${id}----`} id={value} />
                    ))
                }
            </React.Suspense>
        );
    } else {
        return (
            <React.Suspense fallback={
                <Alert status="loading" variant={"left-accent"}>
                    <AlertIcon/>
                    <AlertTitle>Initializing chapters...</AlertTitle>
                </Alert>
            }>
                <Chapters_Element headersTitle={"Chapter " + props.src.get_name()}>
                    {
                        props.src.get_ids().map((value, id) => (
                            <Chapter_Element1_byChapID id={value} key={`--------${id}-------`} with_all_includes />
                        ))
                    }
                </Chapters_Element>
            </React.Suspense>
        );
    }
}
