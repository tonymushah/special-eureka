import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useProSidebar } from "react-pro-sidebar";
import MyErrorBounderies from "./error/MyErrorBounderies";

import mangadex_logo from "/mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg";

const Side_bar = React.lazy(() => import("./sidebar/SideBar"));

const Form1 = React.lazy(() => import("./sidebar/Form1"));

export default function Content(props: React.PropsWithChildren) {
    const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();
    return (

        <div className='w-100 d-inline-flex'>
            <React.Suspense
                fallback={
                    <Chakra.Box
                        width={"80px"}
                        height={"100vh"}
                    >
                        <Chakra.Center>
                            <Chakra.Spinner />
                        </Chakra.Center>
                    </Chakra.Box>
                }
            >
                <Side_bar />
            </React.Suspense>

            <Chakra.Box
                width={"100%"}
                height={"100vh"}
                scrollBehavior={"smooth"}
                overflowY={"scroll"}
            >
                <Chakra.Box id="top-content">
                    <Chakra.Box className="content-header">
                        <Navbar expand={"sm"} >
                            <Container>
                                <Navbar.Brand>
                                    <Chakra.Center onClick={() => toggleSidebar()} display={{
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
                                            <Form1 />
                                        </React.Suspense>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                        <hr className="header-hr" />
                    </Chakra.Box>
                    <Chakra.Box id="content">
                        <MyErrorBounderies>
                            {props.children}
                        </MyErrorBounderies>
                    </Chakra.Box>
                </Chakra.Box>
            </Chakra.Box>
        </div>
    );
}

