import * as Chakra from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.css";
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'react-pro-sidebar/dist/css/styles.css';

import mangadex_logo from "/mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg";


const MangaDexPath: string = "/mangadex/";

const Side_bar = React.lazy(() => import("./sidebar/SideBar"));

const Form1 = React.lazy(() => import("./sidebar/Form1"));
export default class Content extends React.Component<React.PropsWithChildren>{
    isToggled: boolean;
    constructor(props: React.PropsWithChildren) {
        super(props);
        this.isToggled = false
        this.toggle = this.toggle.bind(this)
    }
    toggle() {
        if (this.isToggled == false) {
            this.isToggled = true;
        } else {
            this.isToggled = false
        }
        this.forceUpdate();
    }
    render(): React.ReactNode {
        return (
            <div className='w-100 d-inline-flex'>
                <React.Suspense
                    fallback={
                        <Chakra.Box
                            width={"80px"}
                            height={"100vh"}
                        >
                            <Chakra.Center>
                                <Chakra.Spinner/>
                            </Chakra.Center>
                        </Chakra.Box>
                    }
                >
                    <Side_bar toggled={this.isToggled} onToggle={this.toggle}/>
                </React.Suspense>
                <Chakra.Box
                    width={"100%"}
                    height={"100vh"}
                    scrollBehavior={"smooth"}
                    overflowY={"scroll"}
                >
                    <Chakra.Box id="top-content">
                        <Chakra.Box className="content-header">
                            <Navbar expand={'sm'} >
                                <Container>
                                    <Navbar.Brand>
                                        <Chakra.Center onClick={this.toggle} display={{
                                            base: "flex",
                                            md: "none"
                                        }}>
                                            <img src={mangadex_logo} /> &nbsp; <h4 className='d-inline'>MangaDex </h4>
                                        </Chakra.Center>
                                    </Navbar.Brand>
                                    <Navbar.Toggle className=" float-end" aria-controls='searc_bar_' />
                                    <Navbar.Collapse id="searc_bar_" className=" justify-content-end">
                                        <Nav>
                                            <React.Suspense
                                                fallback={<Chakra.Skeleton
                                                    height={"10px"}
                                                />}
                                            >
                                                <Form1/>
                                            </React.Suspense>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <hr className="header-hr" />
                        </Chakra.Box>
                        <Chakra.Box id="content">
                            {this.props.children}
                        </Chakra.Box>
                    </Chakra.Box>
                </Chakra.Box>
            </div>
        )
    }
}

