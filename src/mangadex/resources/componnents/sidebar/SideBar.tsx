import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import React from "react";
import { FaBookmark, FaBookOpen, FaCog, FaComments, FaHome, FaUser } from "react-icons/fa";
import { Menu, MenuItem, Sidebar, sidebarClasses, SubMenu, useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { getMangaDexPath } from "@mangadex";
import { ExtLink } from "@commons-res/components/ExtLink";
import SideBarUserOption from "./useroption";
import { RiGroupLine } from "react-icons/ri";
import mangadex_logo from "@mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg";
import "@mangadex/resources/css/sidebar.css";

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
                    backgroundColor: "#2c2c2c",
                    color: "#f2f2f2"
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
                            backgroundColor: "#2c2c2c"
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
                            backgroundColor: "#2c2c2c"
                        }
                    }
                }}
                rootStyles={{
                    maxHeight: "80vh",
                    height: "80vh",
                    overflowY: "scroll",
                    overflowX: "hidden"
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
                                backgroundColor: "#2c2c2c",
                                ":hover": {
                                    backgroundColor: "#2c2c2c"
                                }
                            }
                        }}
                    >
                        <Chakra.Tooltip hasArrow placement="right" label={"Available only for signed users"}>
                            <MenuItem>
                                <s>Updates</s>
                            </MenuItem>
                        </Chakra.Tooltip>
                        <Chakra.Tooltip hasArrow placement="right" label={"Available only for signed users"}>
                            <MenuItem>
                                <s>Online Library</s>
                            </MenuItem>
                        </Chakra.Tooltip>
                        <Chakra.Tooltip hasArrow placement="right" label={"Available only for signed users"}>
                            <MenuItem>
                                <s>MDLists</s>
                            </MenuItem>
                        </Chakra.Tooltip>
                        <Chakra.Tooltip hasArrow placement="right" label={"Available only for signed users"}>
                            <MenuItem>
                                <s>Followed Groups</s>
                            </MenuItem>
                        </Chakra.Tooltip>
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
                                backgroundColor: "#2c2c2c",
                                ":hover": {
                                    backgroundColor: "#2c2c2c"
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
                        <Chakra.Tooltip placement="right" hasArrow label={"Will available in the next update"}>
                            <MenuItem>
                                <s>Advanced Search</s>
                            </MenuItem>
                        </Chakra.Tooltip>
                        <MenuItem
                            component={
                                <Link to={MangaDexPath + "titles/recently-added"} />
                            }
                        >Recently Added</MenuItem>
                        <MenuItem
                            component={
                                <Link to={MangaDexPath + "titles/latest-updates"} />
                            }
                        >Latest Updates</MenuItem>
                        <MenuItem
                            component={
                                <Link to={MangaDexPath + "manga/random"} />
                            }
                        >
                            Random
                        </MenuItem>
                        <MenuItem
                            component={
                                <Link to={MangaDexPath + "titles/recently-popular"} />
                            }
                        >
                            Recently Popular
                        </MenuItem>
                    </Menu>
                </SubMenu>
                <SubMenu defaultOpen={false} icon={<RiGroupLine onClick={() => collapseSidebar()}/>} label={"Community"}>
                    <Menu
                        menuItemStyles={{
                            button: {
                                backgroundColor: "#2c2c2c",
                                ":hover": {
                                    backgroundColor: "#2c2c2c"
                                }
                            }
                        }}
                    >
                        <ExtLink href="https://forums.mangadex.org/">
                            <MenuItem
                                icon={<FaComments />}
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
                <SubMenu defaultOpen={false} icon={
                    <Chakra.Icon
                        as={FaCog}
                        onClick={() => collapseSidebar()}
                        className={"fa-spin"}
                    />
                } label={"Powerred by "}>
                    <Menu
                        menuItemStyles={{
                            button: {
                                backgroundColor: "#2c2c2c",
                                ":hover": {
                                    backgroundColor: "#2c2c2c"
                                }
                            }
                        }}
                    >
                        <ExtLink href="https://api.mangadex.org">
                            <MenuItem
                                icon={<img id="tauri_icon" src={mangadex_logo} />}
                                suffix={<ChakraIcons.ExternalLinkIcon />}
                            >
                                Mangadex API
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
                            backgroundColor: "#2c2c2c"
                        }
                    }
                }}
            >
                <SideBarUserOption>
                    <MenuItem
                        icon={
                            <FaUser />
                        }
                        suffix={
                            <Chakra.Tooltip placement="right" hasArrow label={"Available in a future update"}>
                                <Chakra.Button
                                    colorScheme={"facebook"}
                                >
                                    <s>Login</s>
                                </Chakra.Button>
                            </Chakra.Tooltip>
                        }
                    >
                        Guest
                    </MenuItem>
                </SideBarUserOption>
            </Menu>
        </Sidebar>
    );
}
