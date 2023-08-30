import * as Chakra from "@chakra-ui/react";
import "@commons-res/flag-icons/less/flag-icons.less";
import React from "react";
import { Volume } from "@mangadex/api/structures/Volume";
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
                                <Chakra.Accordion allowMultiple>
                                    {
                                        props.src.get_chapters().map((getted, index) => (
                                            <ChaptersComp key={`${props.src.get_name()}-${index}`} src={getted}></ChaptersComp>
                                        ))
                                    }
                                </Chakra.Accordion>
                            ) : (
                                <React.Fragment />
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
                                <React.Fragment>
                                    {
                                        props.src.get_chapters().reverse().map((getted, index) => (
                                            <ChaptersComp key={`${props.src.get_name()}-${index}`} src={getted}></ChaptersComp>
                                        ))
                                    }
                                </React.Fragment>
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
