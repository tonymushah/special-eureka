import React, { useState } from 'react';
import Viewer from 'react-viewer';
import ReactDOM from "react-dom/client";
import "flag-icons/css/flag-icons.min.css";
import { Accordion, Alert, Col, Collapse, Container, Row } from "react-bootstrap";
import { Chapter_ } from "./Chapter_";

function Chapters_Element(props) {
    const [open, setOpen] = useState(false);
    var rand = Math.floor(Math.random() * 1000) + 1;
    return (
        <>
        <Alert>
            <Alert.Link
                onClick={() => setOpen(!open)}
                aria-controls={"ch-" + rand}
                aria-expanded={open}
            >
                {props.headersTitle}
            </Alert.Link>
        </Alert>
        <Collapse in={open}>
            <div id={"ch-" + rand}>
                {props.children}
            </div>
            </Collapse>
        </>
    );
}
export class Chapters{
    state: boolean;
    private chapters_: Array<Chapter_>;
    private react_nodes: Array<React.ReactNode>;
    public constructor(){
        this.initializer();
        this.setState(false);
    }
    public setState(state: boolean){
        this.state = state;
    }
    public initializer1(){
        var s_array: Array<Chapter_> = [];
        for (let index = 0; index < (Math.floor(Math.random() * 8) + 1); index++) {
            s_array.push(new Chapter_());
        }
        this.chapters_ = s_array;
    }
    public initializer2(){
        var to_input: Array<React.ReactNode> = new Array<React.ReactNode>(this.chapters_.length);
        for (let index = 0; index < this.chapters_.length; index++) {
            to_input[index] = (
                this.chapters_[index].render()
            );
        }
        this.react_nodes = to_input;
    }
    public initializer(){
        this.initializer1();
        this.initializer2();
    }
    public render1(): React.ReactNode{
        return (this.chapters_[0].render());
    }
    public render2(): React.ReactNode{
        var chapter_name: string = "Chapters list";
        return (
            <Chapters_Element headersTitle={chapter_name}>
                <div>
                    {this.react_nodes}
                </div>
            </Chapters_Element>
        );
    }
    public render(): React.ReactNode{
        if(this.chapters_.length <= 1){
            return this.render1();
        }else{
            return this.render2();
        }
    }
}