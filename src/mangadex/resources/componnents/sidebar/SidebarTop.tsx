import { Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import mangadex_logo from "@mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg";

export default function SidebarTop() {
    const { collapseSidebar } = useProSidebar();
    return (
        <Menu rootStyles={{
            "paddingTop": "1em",
            "paddingBottom": "1em"
        }} menuItemStyles={{
            button: {
                ":hover": {
                    backgroundColor: "#525252"
                }
            }
        }}>
            <MenuItem icon={<img src={mangadex_logo} />} suffix={<i className='fas fa-chevron-left'></i>} onClick={() => collapseSidebar()}>
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
