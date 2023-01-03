import React from "react";
import { Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { ExtLink } from "../../../../commons-res/components/ExtLink";
import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from 'react-bootstrap';
import { FaArchive, FaHome } from 'react-icons/fa';
import 'react-pro-sidebar/dist/css/styles.css';
import mangadex_logo from "/mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg";
import tauri_logo from "/commons-res/common-icon/Square30x30Logo.png";
import vite_logo from "/commons-res/common-icon/favicon.svg";

const Downloads_badge_ = React.lazy(() => import("./Download_badge"));

export type Side_barProps = {
    toggled: boolean,
    onToggle: (value: boolean) => void
}
const MangaDexPath: string = "/mangadex/";

export default class Side_bar extends React.Component<Side_barProps>{
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
                    <Menu
                        popperArrow={false}
                        subMenuBullets={false}
                    >
                        <MenuItem icon={<FaHome onClick={this.collapse.bind(this)}></FaHome>}>
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
                                <React.Suspense
                                    fallback={<Chakra.Spinner/>}
                                >
                                    <Downloads_badge_ />
                                </React.Suspense>
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
                                    Tauri Apps <ChakraIcons.ExternalLinkIcon />
                                </MenuItem>
                            </ExtLink>
                            <ExtLink href="https://api.mangadex.org">
                                <MenuItem icon={<img id="tauri_icon" src={mangadex_logo} />}>
                                    Mangadex API <ChakraIcons.ExternalLinkIcon />
                                </MenuItem>
                            </ExtLink>
                            <ExtLink href="https://vitejs.dev">
                                <MenuItem icon={<img id="tauri_icon" src={vite_logo} width="28px" />}>
                                    Vite <ChakraIcons.ExternalLinkIcon />
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