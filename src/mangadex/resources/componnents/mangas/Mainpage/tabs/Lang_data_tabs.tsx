import React from "react";
import ReactDOM from "react-dom/client";
import { Accordion, Overlay, Spinner, Button, ButtonGroup, Card, CardGroup, Container, ProgressBar, Row, Col, Collapse, Placeholder, Tab, Nav } from "react-bootstrap";
//import { Tag } from "../../../../mangadex/api/structures/Tag";
import { make_first_UpperCare, Lang_and_Data, Lang, Languages } from "../../../../../api/internal/Utils";

type LAD_TabsProps = {
    src: Array<Lang_and_Data>
    id?: string
    transition?: boolean
}

export class LAD_Tabs extends React.Component<LAD_TabsProps>{
    private to_use: Array<Lang_and_Data>
    constructor(props: LAD_TabsProps){
        super(props);
        this.to_use = this.props.src;
    }
    render(): React.ReactNode {
        return (
            <Tab.Container 
                id={this.props.id} 
                defaultActiveKey={this.to_use[0].get_language().get_two_letter()}
                transition={this.props.transition!}
            >
                <Row>
                    <Col sm={3} md={3}>
                        <Nav variant="pills" className="flex-column">
                            {
                                this.to_use.map((getted: Lang_and_Data) => (
                                    <Nav.Item className="mgdx-colors">
                                        <Nav.Link className="mgdx-colors" eventKey={getted.get_language().get_two_letter()}>
                                            {getted.get_language().get_name()}
                                        </Nav.Link>
                                    </Nav.Item>
                                ))
                            }
                        </Nav>
                    </Col>
                    <Col sm={1} className=" d-inline-flex d-md-none">
                        <> </>
                    </Col>
                    <Col sm={8} md={9} className=" ml-1 overflow-scroll">
                        <Tab.Content>
                            {
                                this.to_use.map((getted: Lang_and_Data) => (
                                    <Tab.Pane eventKey={getted.get_language().get_two_letter()}>
                                        {getted.get_data()}
                                    </Tab.Pane>
                                ))
                            }
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )
    }
}