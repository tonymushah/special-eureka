import * as Chakra from "@chakra-ui/react";
import "flag-icons/css/flag-icons.min.css";
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
            <React.Fragment>
                <h2>
                    <Chakra.AccordionButton _expanded={{ bg: "#ff6740", color: "white" }}>
                        <Chakra.Box flex='1' textAlign='left'>
                            Volume {props.src.get_name()}
                        </Chakra.Box>
                        <Chakra.AccordionIcon />
                    </Chakra.AccordionButton>
                </h2>
                <Chakra.AccordionPanel>
                    <Chakra.Accordion allowMultiple>
                        {
                            props.src.get_chapters().map((getted, index) => (
                                <ChaptersComp key={`${props.src.get_name()}-${index}`} src={getted}></ChaptersComp>
                            ))
                        }
                    </Chakra.Accordion>
                </Chakra.AccordionPanel>
            </React.Fragment>
        </Chakra.AccordionItem>
    );
}