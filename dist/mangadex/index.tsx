import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'react-pro-sidebar/dist/css/styles.css';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Link, Routes, useHref, Outlet, defer, createBrowserRouter, createRoutesFromElements, RouterProvider, useRouteError} from "react-router-dom"
import { ProSidebar, Menu, MenuItem, SubMenu , SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { Container, Row, Col, Stack, Button, Navbar, NavbarBrand, Nav, Modal, Spinner } from 'react-bootstrap';
import * as ReactIcons from "react-icons";
import { ExtLink } from '../commons-res/components/ExtLink';
import { Api_Request } from './api/internal/Api_Request';
import { Manga } from './api/structures/Manga';
import Home from "./pages/Home"
import { Error_cmp } from './resources/componnents/Error_cmp';

const MangaDexPath: string = "/mangadex/";
const app = ReactDOM.createRoot(document.getElementById("app")!);
app.render(
    <Container className='align-content-center'>
        <Spinner animation="grow"></Spinner>
    </Container>
);
class Side_bar extends React.Component{
    isCollapsed: boolean;
    isRTL: boolean;
    isToggled: boolean
    constructor(props){
        super(props);
        if(sessionStorage.getItem("isCollapsed") == null){
            this.isCollapsed = false;
        }else{
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
    render(){
        return (
            <ProSidebar 
                toggled={this.props.toggled} 
                breakPoint="md" 
                id="sidebar" 
                className=' overflow-scroll' 
                rtl={this.isRTL} 
                collapsed={this.isCollapsed} 
                onToggle={this.props.onToggle}
            >
                <SidebarHeader>
                    <Menu>

                        <MenuItem onClick={this.collapse.bind(this)} icon={<img src="./resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg" />}>
                            <Link to={MangaDexPath}>
                                <h4>MangaDex <span id='exit-chevron' className=' float-end'><i className='fas fa-chevron-left'></i></span></h4>
                            </Link>
                        </MenuItem>
                    </Menu>
                </SidebarHeader>
                <SidebarContent>
                    <Menu popperArrow={true} innerSubMenuArrows={true}>
                        <MenuItem icon={<i onClick={this.collapse.bind(this)} className='far fa-home-alt'></i>}> Home </MenuItem>
                        <SubMenu  defaultOpen={false} icon={<i onClick={this.collapse.bind(this)} className='far fa-bookmark'></i>} title={"Follow"}>
                            <MenuItem>Updates</MenuItem>
                            <MenuItem>Library</MenuItem>
                            <MenuItem>MDLists</MenuItem>
                            <MenuItem>Followed Groups</MenuItem>
                        </SubMenu>
                        <MenuItem icon={<i onClick={this.collapse.bind(this)} className='far fa-archive'></i>}> Dowmloads </MenuItem>
                        <SubMenu defaultOpen={false} icon={<i onClick={this.collapse.bind(this)} className='far fa-bookmark'></i>} title={"Titles"}>
                            <MenuItem>Advanced Research</MenuItem>
                            <MenuItem>Latest Updates</MenuItem>
                            <MenuItem>Recently Added</MenuItem>
                            <MenuItem>Random</MenuItem>
                            <MenuItem>Suggestive</MenuItem>
                        </SubMenu>
                        <SubMenu defaultOpen={false} icon={<i onClick={this.collapse.bind(this)} className='fas fa-cog fa-spin'></i>} title={"Powerred by "}>
                            <MenuItem icon={<img id="tauri_icon" src="../commons-res/common-icon/Square30x30Logo.png"/>}>
                                <ExtLink href="https://tauri.app">Tauri Apps</ExtLink>
                            </MenuItem>
                            <MenuItem icon={<img id="tauri_icon" src="./resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg"/>}>
                                <ExtLink href="https://api.mangadex.org">Mangadex API</ExtLink>
                            </MenuItem>
                            <MenuItem icon={<img id="tauri_icon" src="../commons-res/common-icon/favicon.svg" width="28px"/>}>
                                <ExtLink href="https://vitejs.dev">Vite</ExtLink>
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter onClick={this.collapse.bind(this)}>
                    <Menu>
                        <MenuItem icon={<i  className='far fa-user-alt'></i>} suffix={<Button>Login</Button>} > Guest </MenuItem>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
    );
    }
}
class Content extends React.Component{
    isToggled: boolean;
    constructor(props){
        super(props);
        this.isToggled = false
        this.toggle = this.toggle.bind(this)
    }
    toggle(){
        if(this.isToggled == false){
            this.isToggled = true;
        }else{
            this.isToggled = false
        }
        this.forceUpdate();
    }
    render(): React.ReactNode {
        return (
            <div className='w-100 d-inline-flex'>
                <Side_bar toggled={this.isToggled} onToggle={this.toggle}></Side_bar>
                <Container id="top-content">
                    <Container className="content-header">
                        <Navbar expand={'sm'} >
                            <Container>
                                <Navbar.Brand>
                                    <div onClick={this.toggle} className='d-md-none'>
                                        <img src="./resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg" /> <h4 className='d-inline'>MangaDex </h4>
                                    </div>
                                </Navbar.Brand>
                                <Navbar.Toggle className=" float-end" aria-controls='searc_bar_'/>
                                <Navbar.Collapse id="searc_bar_" className=" justify-content-end">
                                    <Nav>
                                        <Form1></Form1>
                                    </Nav>
                                </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <hr className="header-hr"/>
                    </Container>
                    <Container id="content">
                        {this.props.children}
                    </Container>
                </Container>
            </div>
        )
    }
}

class Modal_Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {    
        this.setState({value: event.target.value});  
    }
    handleSubmit(event) {
        event.preventDefault();
    }
    render(){
        return(
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <form onSubmit={this.handleSubmit}>
                    <label>
                        <input placeholder='Search' type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <Button variant="light"><i className='fas fa-search'></i></Button>
                </form>
                </Modal.Header>
                <Modal.Body>
                    <div id="searchBody">

                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}
class Form1 extends React.Component {
    modalState: boolean;
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.modalState = false
    }
    showModal(){
        if(this.modalState == false){
            this.modalState = true;
        }else{
            this.modalState = false
        }
        this.forceUpdate();
    }
    handleChange(event) {
        this.setState({value: event.target.value});
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
                <Modal_Search show={this.modalState} onHide={this.showModal.bind(this)}>

                </Modal_Search>
            </div>
        );
    }
}
const router = createBrowserRouter(
    createRoutesFromElements(
                <Route path={MangaDexPath} element={
                    <Content>
                        <Outlet/>
                    </Content>
                }
                >
                    <Route index 
                        loader={
                            async () => {
                                let loader1 = Manga.search_Manga();
                                return defer({
                                    loader1
                                })
                            }
                        } 
                        element={
                            <Home/>
                        }
                        errorElement={
                            <Errord/>
                        }
                    />
                </Route>
    )
);
function Errord(props): React.ReactNode{
    let errors = useRouteError();
    return (
        <Error_cmp error={JSON.stringify(errors)}/>
    )
}
app.render(<RouterProvider router={router}/>);
