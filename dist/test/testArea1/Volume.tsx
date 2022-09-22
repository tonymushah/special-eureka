import React from "react";
import Viewer from 'react-viewer';
import ReactDOM from "react-dom/client";
import "flag-icons/css/flag-icons.min.css";
import { Accordion, Alert, Col, Container, Row } from "react-bootstrap";
import { Chapter_ } from "./Chapter_";
import { Chapters } from "./Chapters";

export class Volume_{
    private chapterss_: Array<Chapters>;
    private react_nodes: Array<React.ReactNode>;
    public constructor(){
        this.initializer();
    }
    public initializer1(){
        var s_array: Array<Chapters> = [];
        for (let index = 0; index < (Math.floor(Math.random() * 8) + 1); index++) {
            s_array.push(new Chapters());
        }
        this.chapterss_ = s_array;
    }
    public initializer2(){
        var to_input: Array<React.ReactNode> = new Array<React.ReactNode>(this.chapterss_.length);
        for (let index = 0; index < this.chapterss_.length; index++) {
            to_input[index] = (
                this.chapterss_[index].render()
            );
        }
        this.react_nodes = to_input;
    }
    public initializer(){
        this.initializer1();
        this.initializer2();
    }
    public render(eventKey: number): React.ReactNode{
        var chapter_name: string = "Volume";
        return (
            <Accordion>
                <Accordion.Item eventKey={"" + eventKey}>
                    <Accordion.Header>
                        {chapter_name}
                    </Accordion.Header>
                    <Accordion.Body>
                        <Row>
                            {this.react_nodes}
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    }
}