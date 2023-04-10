import * as Chakra from "@chakra-ui/react";
import "flag-icons/css/flag-icons.min.css";
import React from "react";
import { Row } from "react-bootstrap";
import { Volume } from "../../../../../api/structures/Volume";
import { ChaptersComp } from "./Chapters";

type Volume_Props = {
    src: Volume,
    open?: boolean
};

export function Volume_(props: Volume_Props) {
    return (
        <Chakra.AccordionItem
        >
            {({ isExpanded, isDisabled }) => (
                <React.Fragment>
                    <h2>
                        <Chakra.AccordionButton _expanded={{ bg: "#ff6740", color: "white" }}>
                            <Chakra.Box flex='1' textAlign='left'>
                                Volume {props.src.get_name()}
                            </Chakra.Box>
                            <Chakra.AccordionIcon />
                        </Chakra.AccordionButton>
                    </h2>
                    <Chakra.AccordionPanel
                        motionProps={{
                            unmountOnExit: true
                        }}
                    >
                        {
                            isExpanded == true && isDisabled == false ? (
                                <>
                                    <Row>
                                        <>
                                            {
                                                props.src.get_chapters().map(getted => (
                                                    <ChaptersComp src={getted}></ChaptersComp>
                                                ))
                                            }
                                        </>
                                    </Row>
                                </>
                            ) : (
                                <></>
                            )
                        }
                    </Chakra.AccordionPanel>
                </React.Fragment>
            )}

        </Chakra.AccordionItem>
    );
}

export function Volume__reverse(props: Volume_Props) {
    return (
        <Chakra.AccordionItem
        >
            {({ isExpanded , isDisabled }) => (
                <React.Fragment>
                    <h2>
                        <Chakra.AccordionButton _expanded={{ bg: "#ff6740", color: "white" }}>
                            <Chakra.Box flex='1' textAlign='left'>
                                Volume {props.src.get_name()}
                            </Chakra.Box>
                            <Chakra.AccordionIcon />
                        </Chakra.AccordionButton>
                    </h2>
                    <Chakra.AccordionPanel
                        motionProps={{
                            unmountOnExit: true
                        }}
                    >
                        {
                            isExpanded == true && isDisabled == false ? (
                                <>
                                    <Row>
                                        <>
                                            {
                                                props.src.get_chapters().reverse().map(getted => (
                                                    <ChaptersComp src={getted}></ChaptersComp>
                                                ))
                                            }
                                        </>
                                    </Row>
                                </>
                            ) : (
                                <></>
                            )
                        }

                    </Chakra.AccordionPanel>
                </React.Fragment>
            )}

        </Chakra.AccordionItem>
    );
}
