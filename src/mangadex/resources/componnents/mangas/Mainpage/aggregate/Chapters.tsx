import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Spinner } from "@chakra-ui/react";
import { Chapters } from "@mangadex/api/structures/Chapter";
import Chapter_Element1_byChapID from "@mangadex/resources/componnents/chapter/v1/Chapter_Element1_byChapID";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import "flag-icons/css/flag-icons.min.css";
import React from "react";

type Chapters_ElementProps = {
    headersTitle: string
    children: React.ReactNode
}

function Chapters_Element(props: Chapters_ElementProps) {
    return (
        <ChakraContainer>
            <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box>
                                {props.headersTitle}
                            </Box>
                            <AccordionIcon/>
                        </AccordionButton>
                    </h2>
                </AccordionItem>
                <AccordionPanel motionProps={{
                    unmountOnExit : true
                }}>
                    <React.Fragment>
                        {props.children}
                    </React.Fragment>
                </AccordionPanel>
            </Accordion>
        </ChakraContainer>
    );
}

type ChaptersProps = {
    src: Chapters
}

export function ChaptersComp(props : React.PropsWithChildren<ChaptersProps>){
    if (props.src.get_count() == 1) {
            return (
                <React.Suspense fallback={
                    <div className="text-center">
                        <Spinner animation="border"/>
                        <br />
                        <span>Initializing chapters ...</span>
                    </div>
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
                    <div className="text-center">
                        <Spinner animation="border"/>
                        <br />
                        <span>Initializing chapters ...</span>
                    </div>
                }>
                    <Chapters_Element headersTitle={"Chapter " + props.src.get_name()}>
                        {
                            props.src.get_ids().map((value, id) => (
                                <Chapter_Element1_byChapID id={value} key={`--------${id}-------`} with_all_includes/>
                            ))
                        }
                    </Chapters_Element>
                </React.Suspense>
            );
        }
}
