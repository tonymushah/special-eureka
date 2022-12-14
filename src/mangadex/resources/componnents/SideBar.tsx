import React from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import "bootstrap/dist/css/bootstrap.css";
import { Link, Await, useAsyncError } from "react-router-dom"
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { Container, Button, Navbar, Nav, Modal } from 'react-bootstrap';
import { ExtLink } from '../../../commons-res/components/ExtLink';
import * as Chakra from "@chakra-ui/react"
import { useFormik } from 'formik';
import { Offset_limits } from '../../api/internal/Utils';
import { Manga } from '../../api/structures/Manga';
import { ErrorELAsync1 } from './Error_cmp';
import { MangaSimpleEl } from './mangas/MangaSimpleEl';
import * as ChakraIcons from "@chakra-ui/icons"
import DeskApiRequest from "../../api/offline/DeskApiRequest";
import { FaArchive } from 'react-icons/fa';
import * as Offline from "../../api/offline/plugin";


import mangadex_logo from "/mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg";

import tauri_logo from "/commons-res/common-icon/Square30x30Logo.png";

import vite_logo from "/commons-res/common-icon/favicon.svg";
import { Collection } from '../../api/structures/Collection';

const MangaDexPath: string = "/mangadex/";



function Side_bar_error_el(props: {
    toastId: Chakra.ToastId,
    callAfter: () => void
}) {
    let error = useAsyncError();
    const toast = Chakra.useToast();
    toast.update(props.toastId, {
        title: "Error",
        isClosable: true,
        duration: 9000,
        description: error,
        status: "error"
    });
    props.callAfter();
    return (<></>);
}

export function Launch_server(props : {
    callAfter : () => void
}) {
    const toast = Chakra.useToast();
    const toastIdRef = React.useRef<Chakra.ToastId>();
    toastIdRef.current = toast({
        title: "Starting server ...",
        status: "loading",
        position: "bottom-right"
    })!

    return (
        <React.Suspense>
            <Await
                resolve={Offline.launch_server()}
                errorElement={
                    <Side_bar_error_el toastId={toastIdRef.current} callAfter={props.callAfter}/>
                }
            >
                {(getted: string) => {
                    toast.update(toastIdRef.current!, {
                        title: "Server Started",
                        isClosable: true,
                        duration: 9000,
                        status: "success"
                    });
                    props.callAfter();
                    return (<></>);
                }}
            </Await>
        </React.Suspense>
    )
}

export function Stop_server(props : {
    callAfter : () => void
}) {
    const toast = Chakra.useToast();
    const toastIdRef = React.useRef<Chakra.ToastId>();
    toastIdRef.current = toast({
        title: "Stoping server ...",
        status: "loading",
        position: "bottom-right"
    })!

    return (
        <React.Suspense>
            <Await
                resolve={Offline.stop_server()}
                errorElement={
                    <Side_bar_error_el toastId={toastIdRef.current} callAfter={props.callAfter}/>
                }
            >
                {(getted: string) => {
                    toast.update(toastIdRef.current!, {
                        title: "Server Stopped",
                        isClosable: true,
                        duration: 9000,
                        status: "success"
                    });
                    props.callAfter();
                    return (<></>);
                }}
            </Await>
        </React.Suspense>
    )
}

function Downloads_badge() {
    const [loader, setLoader] = React.useState<React.ReactNode>(<></>);

    const [internal_serverStatus, setServ] = React.useState<boolean>();

    DeskApiRequest.ping().then(setServ).catch(() => {
        
    });

    function refresh(){
        DeskApiRequest.ping().then(setServ).catch(setServ);
    }

    return (
        <Chakra.Box onClick={() => {
            if (internal_serverStatus == false) {
                setLoader(<Launch_server callAfter={refresh}/>)
            } else {
                setLoader(<Stop_server callAfter={refresh} />)
            }
        }}>
            {
                internal_serverStatus ? (
                    <Chakra.Badge bg='green.500'>ON</Chakra.Badge>
                ) : (
                    <Chakra.Badge bg='red.500'>OFF</Chakra.Badge>
                )
            }
            {
                loader
            }
        </Chakra.Box>
    )
}

export type Side_barProps = {
    toggled: boolean,
    onToggle: (value: boolean) => void
}

export class Side_bar extends React.Component<Side_barProps>{
    isCollapsed: boolean;
    isRTL: boolean;
    isToggled: boolean;
    constructor(props: Side_barProps) {
        super(props);
        if (sessionStorage.getItem("isCollapsed") == null) {
            this.isCollapsed = false;
        } else {
            this.isCollapsed = JSON.parse(sessionStorage.getItem("isCollapsed")!)
        }
        this.isToggled = false;
    }
    collapse() {
        if (this.isCollapsed == false) {
            this.isCollapsed = true;
        } else {
            this.isCollapsed = false;
        }
        sessionStorage.setItem("isCollapsed", JSON.stringify(this.isCollapsed));
        this.forceUpdate();
    }
    RTL() {
        if (this.isRTL == false) {
            this.isRTL = true;
        } else {
            this.isRTL = false;
        }
        this.forceUpdate();
    }
    render() {
        
        return (
            <ProSidebar
                toggled={this.props.toggled}
                breakPoint="md"
                id="sidebar"
                className='sidebar-mgdx overflow-scroll'
                rtl={this.isRTL}
                collapsed={this.isCollapsed}
                onToggle={this.props.onToggle}
            >
                <SidebarHeader>
                    <Menu>
                        <MenuItem onClick={this.collapse.bind(this)} icon={<img src={mangadex_logo} />}>
                            <Chakra.Heading fontFamily={"inherit"} size={"md"}>MangaDex <span id='exit-chevron' className=' float-end'><i className='fas fa-chevron-left'></i></span></Chakra.Heading>
                        </MenuItem>
                    </Menu>
                </SidebarHeader>
                <SidebarContent>
                    <Menu popperArrow={true} innerSubMenuArrows={true}>
                        <MenuItem icon={<i onClick={this.collapse.bind(this)} className='far fa-home-alt'></i>}>
                            <Link to={MangaDexPath}>
                                Home
                            </Link>
                        </MenuItem>
                        <SubMenu defaultOpen={false} icon={<i onClick={this.collapse.bind(this)} className='far fa-bookmark'></i>} title={"Follow"}>
                            <MenuItem>Updates</MenuItem>
                            <MenuItem>Library</MenuItem>
                            <MenuItem>MDLists</MenuItem>
                            <MenuItem>Followed Groups</MenuItem>
                        </SubMenu>
                        <SubMenu defaultOpen={false} icon={
                                <Chakra.Icon
                                    as={FaArchive}
                                    onClick={this.collapse.bind(this)}
                                    size={"xs"}
                                />
                            } title={"Download"}>
                            <MenuItem suffix={
                                <Downloads_badge/>
                            }>Server : </MenuItem>
                            <MenuItem> 
                                <Link to="/mangadex/download">
                                    Library 
                                </Link>
                            </MenuItem>
                        </SubMenu>
                        <SubMenu defaultOpen={false} icon={<i onClick={this.collapse.bind(this)} className='far fa-bookmark'></i>} title={"Titles"}>
                            <MenuItem>Advanced Research</MenuItem>
                            <MenuItem>Latest Updates</MenuItem>
                            <MenuItem>Recently Added</MenuItem>
                            <MenuItem>
                                <Link to="/mangadex/manga/random" replace={true} >
                                    Random
                                </Link></MenuItem>
                            <MenuItem>Suggestive</MenuItem>
                        </SubMenu>
                        <SubMenu defaultOpen={false} icon={<i onClick={this.collapse.bind(this)} className='fas fa-cog fa-spin'></i>} title={"Powerred by "}>
                            <ExtLink href="https://tauri.app">
                                <MenuItem icon={<img id="tauri_icon" src={tauri_logo} />}>
                                    Tauri Apps <ChakraIcons.ExternalLinkIcon/>
                                </MenuItem>
                            </ExtLink>
                            <ExtLink href="https://api.mangadex.org">
                                <MenuItem icon={<img id="tauri_icon" src={mangadex_logo} />}>
                                    Mangadex API <ChakraIcons.ExternalLinkIcon/>
                                </MenuItem>
                            </ExtLink>
                            <ExtLink href="https://vitejs.dev">
                                <MenuItem icon={<img id="tauri_icon" src={vite_logo} width="28px" />}>
                                    Vite <ChakraIcons.ExternalLinkIcon/>
                                </MenuItem>
                            </ExtLink>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter onClick={this.collapse.bind(this)}>
                    <Menu>
                        <MenuItem icon={<i className='far fa-user-alt'></i>} suffix={<Button>Login</Button>} > Guest </MenuItem>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
        );
    }
}
export class Content extends React.Component<React.PropsWithChildren>{
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
                <Side_bar toggled={this.isToggled} onToggle={this.toggle}/>
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
                                            <img src="./resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg" /> <h4 className='d-inline'>MangaDex </h4>
                                        </Chakra.Center>
                                    </Navbar.Brand>
                                    <Navbar.Toggle className=" float-end" aria-controls='searc_bar_' />
                                    <Navbar.Collapse id="searc_bar_" className=" justify-content-end">
                                        <Nav>
                                            <Form1/>
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

type Modal_SearchProps = {
    show: boolean,
    onHide: () => void
}

export function Modal_Search(props: Modal_SearchProps) {
    const ref1 = React.createRef<HTMLDivElement>();
    const [result, setResult] = React.useState(<></>);
    const build = (array: Array<Manga>) => {
        let builded: Array<React.ReactNode> = [];
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            builded[index] = (
                <MangaSimpleEl src={element} />
            )
        }
        return builded;
    }
    const formik = useFormik({
        initialValues: {
            title: ""
        },
        onSubmit: values => {
            setResult(<></>)
            let offset_limits_1 = new Offset_limits();
            let promise = Manga.search({
                offset_Limits: offset_limits_1,
                title: values.title
            });
            formik.setSubmitting(false);
            setResult(
                <React.Suspense
                    fallback={
                        <Chakra.Center>
                            <Chakra.Spinner
                                size={"xl"}
                            />
                        </Chakra.Center>
                    }
                >
                    <Await
                        resolve={promise}
                        errorElement={
                            <ErrorELAsync1 />
                        }
                    >
                        {(getted0: Collection<Manga>) => {
                            return (
                                <Chakra.Box>
                                    {
                                        getted0.get_data().map(mangas => (
                                            <MangaSimpleEl src={mangas} />
                                        ))
                                    }
                                </Chakra.Box>
                            )
                        }}
                    </Await>
                </React.Suspense>
            )
        }
    })
    return (
        <Modal show={props.show} onHide={props.onHide} className={" w-100"}>
            <Modal.Header closeButton>
                <Chakra.Box>
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <Chakra.Stack
                            direction={"row"}
                            spacing={4}
                        >
                            <Chakra.Input
                                placeholder="Search"
                                onChange={formik.handleChange}
                                name={"title"}
                                variant='flushed'
                            />
                            <Chakra.IconButton
                                type="submit"
                                icon={<ChakraIcons.SearchIcon />}
                                aria-label={"Search Title"}
                                isLoading={formik.isSubmitting}
                            />
                        </Chakra.Stack>
                    </form>
                </Chakra.Box>
            </Modal.Header>
            <Modal.Body>
                <Chakra.Box
                >
                    {result}
                </Chakra.Box>
            </Modal.Body>
        </Modal>
    );
}
export class Form1 extends React.Component {
    modalState: boolean;
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.modalState = false
    }
    showModal() {
        if (this.modalState == false) {
            this.modalState = true;
        } else {
            this.modalState = false
        }
        this.forceUpdate();
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.showModal.bind(this)}>
                    <label>
                        <input placeholder='Search' type="text" onClick={this.showModal.bind(this)} />
                    </label>
                    <Button onClick={this.showModal.bind(this)}><i className='fas fa-search'></i> </Button>
                </form>
                <Modal_Search show={this.modalState} onHide={this.showModal.bind(this)} />
            </div>
        );
    }
}
