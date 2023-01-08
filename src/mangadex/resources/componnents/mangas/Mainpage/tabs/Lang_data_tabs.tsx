import { Box, Center, Link, Skeleton, Spinner } from "@chakra-ui/react";
import React from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { Lang_and_Data } from "../../../../../api/internal/Utils";

const ReactMarkDown = React.lazy(() => import("react-markdown"));
const ExtLink = React.lazy( async () => {
    let res = await import("../../../../../../commons-res/components/ExtLink");
    return {
        default : res.ExtLink
    };
})

type LAD_TabsProps = {
    src: Array<Lang_and_Data>
    id?: string
    transition?: boolean
}

export class LAD_Tabs extends React.Component<LAD_TabsProps>{
    private to_use: Array<Lang_and_Data>
    constructor(props: LAD_TabsProps) {
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
                                        <React.Suspense
                                            fallback={<Box
                                                width={"full"}
                                            >
                                                <Center>
                                                    <Spinner/>
                                                </Center>
                                            </Box>}
                                        >
                                            <ReactMarkDown 
                                                children={getted.get_data()}
                                                components={{
                                                    a(node, href, ...props){
                                                        return (
                                                            <React.Suspense
                                                                fallback={<Skeleton width={"10px"} height={"10px"}/>}
                                                            >
                                                                <Link as={ExtLink} href={href}>{node}</Link>
                                                            </React.Suspense>
                                                        )
                                                    }
                                                }}
                                            />
                                        </React.Suspense>
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