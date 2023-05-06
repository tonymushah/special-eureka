import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { ExtLink } from "@commons-res/components/ExtLink";
import { getMangaDexPath } from "@mangadex";
import "@mangadex/resources/css/sidebar.css";
import mangadex_logo from "@mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg";
import React from "react";
import { FaBookmark, FaBookOpen, FaCog, FaComments, FaHome, FaUser } from "react-icons/fa";
import { RiGroupFill, RiSearchEyeFill } from "react-icons/ri";
import { Menu, MenuItem, Sidebar, sidebarClasses, SubMenu, useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import SideBarUserOption from "./useroption";
import Hotkeys from "react-hot-keys";
import { useChapterFullscreen } from "../chapter/fullscreen/Context";
import useRTLSidebar from "@mangadex/resources/hooks/userOptions/RtlSidebar";

const Downloads_badge_ = React.lazy(() => import("./Download_badge"));

const Downloads_badge_With_Server_Icon = React.lazy(() => import("./Download_Badge_with_Server_Icon"));

const MangaDexPath: string = getMangaDexPath() + "/";

function ActualSidebar() {
    const { collapseSidebar } = useProSidebar();
    const { query } = useRTLSidebar();
    return (
        <Sidebar
            breakPoint={"md"}
            rtl={query.data}
            rootStyles={{
                [`.${sidebarClasses.container}`]: {
                    backgroundColor: "#2c2c2c",
                    color: "#f2f2f2"
                }
            }}
            backgroundColor="#2c2c2c"
            defaultCollapsed
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
                <SubMenu
                    icon={
                        <RiSearchEyeFill />
                    }
                    label="Search"
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
                                <Link to={MangaDexPath + "titles/search"} />
                            }
                        >
                            Manga
                        </MenuItem>
                        <MenuItem
                            component={
                                <Link to={MangaDexPath + "author/search"} />
                            }
                        >
                            Author
                        </MenuItem>
                        <MenuItem
                            component={
                                <Link to={MangaDexPath + "group/search"} />
                            }
                        >
                            Groups
                        </MenuItem>
                        <MenuItem>Chapter</MenuItem>
                    </Menu>
                </SubMenu>
                <SubMenu defaultOpen={false} icon={<RiGroupFill onClick={() => collapseSidebar()} />} label={"Community"}>
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

export default function Side_bar() {
    const { toggleSidebar } = useProSidebar();
    const { toggle } = useRTLSidebar();
    const { query } = useChapterFullscreen();
    return (
        <React.Fragment>
            <Hotkeys
                keyName="ctrl+p"
                onKeyDown={() => {
                    toggleSidebar();
                    console.log("ctrl+p");
                }}
            />
            <Hotkeys
                keyName="ctrl+r"
                onKeyDown={() => {
                    toggle();
                    console.log("ctrl+r");
                }}
            />
            {
                query.data == true ? (
                    <></>
                ) : (
                    <Chakra.Box>
                        <ActualSidebar />
                    </Chakra.Box>
                )
            }
        </React.Fragment>
    );
}
