import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { ExtLink } from "@commons-res/components/ExtLink";
import { getMangaDexPath } from "@mangadex/index";
import "@mangadex/resources/css/sidebar.css";
import React from "react";
import { FaBookmark, FaBookOpen, FaCog, FaComments, FaHome } from "react-icons/fa";
import { RiGroupFill, RiSearchEyeFill } from "react-icons/ri";
import { Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import MangadexSpinner from "../kuru_kuru/MangadexSpinner";
import mangadex_logo from "@mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg";

const Downloads_badge_ = React.lazy(() => import("./Download_badge"));

const Downloads_badge_With_Server_Icon = React.lazy(() => import("./Download_Badge_with_Server_Icon"));

const MangaDexPath: string = getMangaDexPath() + "/";

export default function SideBarContent() {
    const { collapseSidebar } = useProSidebar();
    return (
        <Menu
            menuItemStyles={{
                button: {
                    ":hover": {
                        backgroundColor: "#525252"
                    }
                }
            }}
            rootStyles={{
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
                                backgroundColor: "#525252"
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
                        fallback={<MangadexSpinner />}
                    >
                        <Downloads_badge_With_Server_Icon />
                    </React.Suspense>
                }
                suffix={
                    <React.Suspense
                        fallback={<MangadexSpinner />}
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
                                backgroundColor: "#525252"
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
                                backgroundColor: "#525252"
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
                                backgroundColor: "#525252"
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
                                backgroundColor: "#525252"
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
    );
}