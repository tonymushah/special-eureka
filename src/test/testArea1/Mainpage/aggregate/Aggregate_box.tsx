import React from "react";
import Viewer from "react-viewer";
import ReactDOM from "react-dom/client";
import "flag-icons/css/flag-icons.min.css";
import { Accordion, Alert, Col, Container, Row } from "react-bootstrap";
import { Aggregate } from "../../../../mangadex/api/structures/Aggregate";
import { Volume_ } from "./Volume";
import { Volume } from "../../../../mangadex/api/structures/Volume";
import * as Chakra from "@chakra-ui/react";
type Aggregate_boxProps = {
    src: Aggregate
    separator: number
}

export class Aggregate_box extends React.Component<Aggregate_boxProps>{
    private toUse: Aggregate;
    private separator : number;
    private parts: number;
    private Chapters_parts: Array<Array<Volume>>;
    private selected: number;
    constructor(props: Aggregate_boxProps){
        super(props);
        this.toUse = this.props.src;
        this.separator = this.props.separator;
        this.Chapters_parts = [];
        this.set_parts();
        this.sliceAll();
    }
    set_parts(){
        if(this.toUse.get_count() % this.separator != 0){
            this.parts = Math.floor(this.toUse.get_count() / this.separator) + 1;
        }else{
            this.parts = Math.floor(this.toUse.get_count() / this.separator);
        }
    }
    sliceAll(){
        for(let index = 0; index < this.parts; index++){
            this.Chapters_parts[index] = (this.toUse.get_volumes().reverse().slice(index * this.separator, (index + 1) * this.separator));
        }
    }
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Chakra.Accordion defaultIndex={[0]} allowMultiple>
                    {
                        this.Chapters_parts[0].map<React.ReactNode>(volume => (
                            <Volume_ src={volume} open={true}></Volume_>
                        ))
                    }
                </Chakra.Accordion>
            </React.Fragment>
        );
    }
}