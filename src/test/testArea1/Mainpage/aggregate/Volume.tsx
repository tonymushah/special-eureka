import React from "react";
import Viewer from "react-viewer";
import ReactDOM from "react-dom/client";
import "flag-icons/css/flag-icons.min.css";
import { Accordion, Alert, Col, Container, Row } from "react-bootstrap";
import { Chapter_ } from "./Chapter_";
import { ChaptersComp } from "./Chapters";
import { Volume } from "../../../../mangadex/api/structures/Volume";
import * as Chakra from "@chakra-ui/react";
type Volume_Props = {
    src : Volume
    open?: boolean
};

export class Volume_ extends React.Component<Volume_Props>{
    private toUse: Volume;
    private open: boolean;
    public constructor(props: Volume_Props){
        super(props);
        this.toUse = this.props.src;
        if(this.props.open == undefined){
            this.open = true;
        }else{
            this.open = this.props.open!;
        }
    }
    public render(): React.ReactNode{
        const chapter_name = "Volume";
        return (
                <Chakra.AccordionItem>
                    <h2>
                        <Chakra.AccordionButton _expanded={{ bg: "#ff6740", color: "white" }}>
                            <Chakra.Box flex='1' textAlign='left'>
                                Volume {this.toUse.get_name()}
                            </Chakra.Box>
                            <Chakra.AccordionIcon />
                        </Chakra.AccordionButton>
                    </h2>
                    <Chakra.AccordionPanel>
                        <Row>
                            <>
                                {
                                    this.toUse.get_chapters().reverse().map(getted => (
                                        <ChaptersComp src={getted}></ChaptersComp>
                                    ))
                                }
                            </>
                        </Row>
                    </Chakra.AccordionPanel>
                </Chakra.AccordionItem>
        );
    }
}