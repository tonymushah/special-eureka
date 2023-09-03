import { Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import mangadex_logo from "@mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useBackgroundColorHover } from "./ActualSidebar";

export default function SidebarTop() {
    const { collapseSidebar } = useProSidebar();
    const hoverBackgroundColor = useBackgroundColorHover();
    return (
        <Menu rootStyles={{
            "paddingTop": "1em",
            "paddingBottom": "1em"
        }} menuItemStyles={{
            button: {
                ":hover": {
                    backgroundColor: hoverBackgroundColor
                }
            }
        }}>
            <MenuItem icon={<img src={mangadex_logo} />} suffix={<ChevronLeftIcon/>} onClick={() => collapseSidebar()}>
                <span style={{
                    "fontSize": "20px",
                    fontFamily: "inherit",
                    fontWeight: "bold"
                }}>
                    MangaDex
                </span>
            </MenuItem>
        </Menu>
    );
}
