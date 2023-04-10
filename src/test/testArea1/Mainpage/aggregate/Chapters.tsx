import React, { useState } from "react";
import Viewer from "react-viewer";
import ReactDOM from "react-dom/client";
import "flag-icons/css/flag-icons.min.css";
import { Accordion, Alert, Col, Collapse, Container, Row, Spinner } from "react-bootstrap";
import { Chapter, Chapters, Chapter_withAllIncludes } from "../../../../mangadex/api/structures/Chapter";
import { Chapter_, Chapter_includes } from "../../../../mangadex/resources/componnents/chapters/Chapter_";
import { Await } from "react-router-dom";

type Chapters_ElementProps = {
    headersTitle: string
    children: any
}

function Chapters_Element(props: Chapters_ElementProps) {
    const [open, setOpen] = useState(true);
    const rand = Math.floor(Math.random() * 1000) + 1;
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
    src : Chapters
}

export class ChaptersComp extends React.Component<ChaptersProps>{
    state: boolean;
    private toUse: Chapters;
    public constructor(props: ChaptersProps){
        super(props);
    //    this.initializer();
        this.setState(true);
        this.toUse = this.props.src;
    }
    public setState(state: boolean){
        this.state = state;
    }
    
    render(): React.ReactNode {
        if(this.toUse.get_count() == 1){
            return (
                <React.Suspense fallback={
                    <div className="text-center">
                            <Spinner animation="border">
                            </Spinner>
                            <br/>
                        <span>Initializing chapters ...</span>
                    </div>
                }>
                    <Await
                        resolve={this.toUse.initialize_and_get_Chapters()}
                        errorElement={
                            <Alert variant="danger">
                                <span>Error on loading chapter</span>
                            </Alert>
                        }
                        children={(getted: Array<Chapter_withAllIncludes>) => {
                                return (
                                    <Chapter_includes chapter={getted[0]}></Chapter_includes>
                                );
                            }
                        }
                    />
                </React.Suspense>
            );
        }else{
            return (
                <React.Suspense fallback={
                    <div className="text-center">
                            <Spinner animation="border">
                            </Spinner>
                            <br/>
                        <span>Initializing chapters ...</span>
                    </div>
                }>
                    <Await
                        resolve={this.toUse.initialize_and_get_Chapters()}
                        errorElement={
                            <Alert variant="danger">
                                <span>Error on loading chapter</span>
                            </Alert>
                        }
                        children={(dGetted: Array<Chapter_withAllIncludes>) => {
                                return (
                                    <Chapters_Element headersTitle={"Chapter " + this.toUse.get_name()}>
                                        {
                                            dGetted.reverse().map(getted => (
                                                <Chapter_includes chapter={getted}></Chapter_includes>
                                            ))
                                        }
                                    </Chapters_Element>
                                );
                            }
                        }
                    />
                </React.Suspense>
            );
        }
        
    }
}