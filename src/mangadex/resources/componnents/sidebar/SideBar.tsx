import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { FaBookmark, FaBookOpen, FaComments, FaHome, FaUser } from 'react-icons/fa';
import { Menu, MenuItem, Sidebar, sidebarClasses, SubMenu, useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { getMangaDexPath } from "../../..";
import { ExtLink } from "../../../../commons-res/components/ExtLink";
import vite_logo from "/commons-res/common-icon/favicon.svg";
import tauri_logo from "/commons-res/common-icon/Square30x30Logo.png";
import mangadex_logo from "/mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg";

const Downloads_badge_ = React.lazy(() => import("./Download_badge"));

const Downloads_badge_With_Server_Icon = React.lazy(() => import("./Download_Badge_with_Server_Icon"));

const MangaDexPath: string = getMangaDexPath() + "/";

export default function Side_bar() {
    const { collapseSidebar } = useProSidebar();
    return (
        <Sidebar
            breakPoint="md"
            rootStyles={{
                [`.${sidebarClasses.container}`]: {
                    backgroundColor: '#2c2c2c',
                    color: '#f2f2f2'
                }
            }}
        >
            <Menu
                rootStyles={{
                    "paddingTop": "1em",
                    "paddingBottom": "1em"
                }}
                menuItemStyles={{
                    button: {
                        ":hover": {
                            backgroundColor: '#2c2c2c'
                        }
                    }
                }}
            >
                <MenuItem
                    icon={
                        <img src={mangadex_logo} />
                    }
                    suffix={
                        <i className='fas fa-chevron-left'></i>
                    }
                    onClick={() => collapseSidebar()}
                >
                    <span
                        style={{
                            "fontSize": "20px",
                            fontFamily: "inherit",
                            fontWeight: "bold"
                        }}
                    >MangaDex</span>
                </MenuItem>
            </Menu>
            <Menu
                menuItemStyles={{
                    button: {
                        ":hover": {
                            backgroundColor: '#2c2c2c'
                        }
                    }
                }}
                rootStyles={{
                    maxHeight : "80vh",
                    height: "80vh",
                    overflowY : "scroll",
                    overflowX : "hidden"
                }}
            >

                <MenuItem
                    icon={
                        <FaHome />
                    }
                    component={
                        <Link to={MangaDexPath} />
                    }
                >
                    Home
                </MenuItem>
                <SubMenu
                    icon={
                        <FaBookmark />
                    }
                    label="Follows"
                    rootStyles={{
                        backgroundColor: "inherit"
                    }}
                >
                    <Menu
                        menuItemStyles={{
                            button: {
                                backgroundColor: '#2c2c2c',
                                ":hover": {
                                    backgroundColor: '#2c2c2c'
                                }
                            }
                        }}
                    >
                        <MenuItem
                            component={
                                <Link
                                    to={MangaDexPath + "download"}
                                />
                            }
                        >
                            Offline Library
                        </MenuItem>
                        <MenuItem>Updates</MenuItem>
                        <MenuItem> Online Library</MenuItem>
                        <MenuItem>MDLists</MenuItem>
                        <MenuItem>Followed Groups</MenuItem>
                    </Menu>
                </SubMenu>
                <MenuItem
                    icon={
                        <React.Suspense
                            fallback={<Chakra.Spinner />}
                        >
                            <Downloads_badge_With_Server_Icon />
                        </React.Suspense>
                    }
                    suffix={
                        <React.Suspense
                            fallback={<Chakra.Spinner />}
                        >
                            <Downloads_badge_ />
                        </React.Suspense>
                    }
                > Offline Server </MenuItem>
                <SubMenu
                    icon={
                        <FaBookOpen />
                    }
                    label="Titles"
                    rootStyles={{
                        backgroundColor: "inherit"
                    }}
                >
                    <Menu
                        menuItemStyles={{
                            button: {
                                backgroundColor: '#2c2c2c',
                                ":hover": {
                                    backgroundColor: '#2c2c2c'
                                }
                            }
                        }}
                    >
                        <MenuItem
                            component={
                                <Link
                                    to={MangaDexPath + "download"}
                                />
                            }
                        >
                            Advanced Search
                        </MenuItem>
                        <MenuItem
                            component={
                                <Link to={MangaDexPath + "titles/recently-added"}/>
                            }
                        >Recently Added</MenuItem>
                        <MenuItem>Latest Updates</MenuItem>
                        <MenuItem
                            component={
                                <Link to={MangaDexPath + "manga/random"} />
                            }
                        >
                            Random
                        </MenuItem>
                    </Menu>
                </SubMenu>
                <SubMenu defaultOpen={false} icon={<i onClick={() => collapseSidebar()} className={"far fa-users"}></i>} label={"Community"}>
                    <Menu
                        menuItemStyles={{
                            button: {
                                backgroundColor: '#2c2c2c',
                                ":hover": {
                                    backgroundColor: '#2c2c2c'
                                }
                            }
                        }}
                    >
                        <ExtLink href="https://forums.mangadex.org/">
                            <MenuItem 
                                icon={<FaComments/>}
                                suffix={<ChakraIcons.ExternalLinkIcon />}
                            >
                                Forums 
                            </MenuItem>
                        </ExtLink>
                        <MenuItem
                            component={
                                <Link to={MangaDexPath + "group/search"} />
                            }
                        >
                            Groups
                        </MenuItem>
                    </Menu>
                </SubMenu>
                <SubMenu defaultOpen={false} icon={<i onClick={() => collapseSidebar()} className='fas fa-cog fa-spin'></i>} label={"Powerred by "}>
                    <Menu
                        menuItemStyles={{
                            button: {
                                backgroundColor: '#2c2c2c',
                                ":hover": {
                                    backgroundColor: '#2c2c2c'
                                }
                            }
                        }}
                    >
                        <ExtLink href="https://tauri.app">
                            <MenuItem icon={<img id="tauri_icon" src={tauri_logo} />}
                                suffix={<ChakraIcons.ExternalLinkIcon />}
                            >
                                Tauri Apps 
                            </MenuItem>
                        </ExtLink>
                        <ExtLink href="https://api.mangadex.org">
                            <MenuItem 
                                icon={<img id="tauri_icon" src={mangadex_logo} />}
                                suffix={<ChakraIcons.ExternalLinkIcon />}
                            >
                                Mangadex API
                            </MenuItem>
                        </ExtLink>
                        <ExtLink href="https://vitejs.dev">
                            <MenuItem 
                                icon={<img id="tauri_icon" src={vite_logo} width="28px" />}
                                suffix={<ChakraIcons.ExternalLinkIcon />}
                            >
                                Vite 
                            </MenuItem>
                        </ExtLink>
                    </Menu>
                </SubMenu>

            </Menu>
            <Menu
                rootStyles={{

                }}
                menuItemStyles={{
                    button: {
                        ":hover": {
                            backgroundColor: '#2c2c2c'
                        }
                    }
                }}
            >
                <MenuItem
                    icon={
                        <FaUser />
                    }
                    suffix={
                        <Chakra.Button
                            colorScheme={"facebook"}
                        >
                            Login
                        </Chakra.Button>
                    }
                >
                    Guest
                </MenuItem>
            </Menu>
        </Sidebar>
    )
}
