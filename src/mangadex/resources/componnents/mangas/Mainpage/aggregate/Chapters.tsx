import React, { useState } from 'react';
import Viewer from 'react-viewer';
import ReactDOM from "react-dom/client";
import "flag-icons/css/flag-icons.min.css";
import { Accordion, Alert, Col, Collapse, Container, Row, Spinner } from "react-bootstrap";
import { Chapter, Chapters, Chapter_withAllIncludes } from '../../../../../api/structures/Chapter';
import { Chapter_, Chapter_includes } from '../../../chapters/Chapter_';
import { Await } from 'react-router-dom';
import { ErrorELAsync } from '../../../Error_cmp';
import Chapter_Element1_byChapID from '../../../chapter/v1/Chapter_Element1_byChapID';

type Chapters_ElementProps = {
    headersTitle: string
    children: any
}

function Chapters_Element(props: Chapters_ElementProps) {
    const [open, setOpen] = useState(true);
    let rand = Math.floor(Math.random() * 1000) + 1;
    return (
        <Container>
            <Row>
                <Col >
                    <Alert.Link
                        className="mgdx-colors-hover"
                        onClick={() => setOpen(!open)}
                        aria-controls={"ch-" + rand}
                        aria-expanded={open}
                    >
                        {props.headersTitle}
                    </Alert.Link>
                </Col>
                <Collapse in={open}>
                    <div id={"ch-" + rand}>
                        {props.children}
                    </div>
                </Collapse>
            </Row>
        </Container>
    );
}

type ChaptersProps = {
    src: Chapters
}

export class ChaptersComp extends React.Component<ChaptersProps>{
    state: boolean;
    private toUse: Chapters;
    public constructor(props: ChaptersProps) {
        super(props)
        //    this.initializer();
        this.setState(true);
        this.toUse = this.props.src
    }
    public setState(state: boolean) {
        this.state = state;
    }

    render(): React.ReactNode {
        if (this.toUse.get_count() == 1) {
            return (
                <React.Suspense fallback={
                    <div className="text-center">
                        <Spinner animation="border">
                        </Spinner>
                        <br />
                        <span>Initializing chapters ...</span>
                    </div>
                }>
                    {
                        this.toUse.get_ids().map((value) => (
                            <Chapter_Element1_byChapID id={value} />
                        ))
                    }
                </React.Suspense>
            );
        } else {
            return (
                <React.Suspense fallback={
                    <div className="text-center">
                        <Spinner animation="border">
                        </Spinner>
                        <br />
                        <span>Initializing chapters ...</span>
                    </div>
                }>
                    <Chapters_Element headersTitle={"Chapter " + this.toUse.get_name()}>
                        {
                            this.toUse.get_ids().map((value) => (
                                <Chapter_Element1_byChapID id={value} />
                            ))
                        }
                    </Chapters_Element>
                </React.Suspense>
            );
        }

    }
}