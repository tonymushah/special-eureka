import { getMangaDexPath } from "@mangadex/index";
import "@mangadex/resources/css/sidebar.css";
import { Menu } from "react-pro-sidebar";
import { useBackgroundColorHover } from "../ActualSidebar";
import { Home } from "./Home";
import { Follows } from "./Follows";
import { Titles } from "./Titles";
import { Search } from "./Search";
import { Community } from "./Community";
import { Credits } from "./Credits";
import { Offline_Server } from "./Offline_Server";

export const MangaDexPath: string = getMangaDexPath() + "/";

export default function SideBarContent() {
    const hoverBackgroundColor = useBackgroundColorHover();
    return (
        <Menu
            menuItemStyles={{
                button: {
                    ":hover": {
                        backgroundColor: hoverBackgroundColor
                    }
                }
            }}
            rootStyles={{
                overflowX: "hidden"
            }}
        >
            <Home />
            <Follows />
            <Offline_Server/>
            <Titles />
            <Search />
            <Community />
            <Credits />
        </Menu>
    );
}