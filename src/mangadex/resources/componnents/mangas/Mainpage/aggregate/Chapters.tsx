import "flag-icons/css/flag-icons.min.css";
import React, { useState } from "react";
import { Alert, Col, Collapse, Row, Spinner } from "react-bootstrap";
import { Chapters } from "@mangadex/api/structures/Chapter";
import Chapter_Element1_byChapID from "@mangadex/resources/componnents/chapter/v1/Chapter_Element1_byChapID";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";

type Chapters_ElementProps = {
    headersTitle: string
    children: React.ReactNode
}

function Chapters_Element(props: Chapters_ElementProps) {
    const [open, setOpen] = useState(true);
    const rand = Math.floor(Math.random() * 1000) + 1;
    return (
        <ChakraContainer>
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
                <Collapse in={open} unmountOnExit>
                    <div id={"ch-" + rand}>
                        {props.children}
                    </div>
                </Collapse>
            </Row>
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
                        <Spinner animation="border">
                        </Spinner>
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
                        <Spinner animation="border">
                        </Spinner>
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
