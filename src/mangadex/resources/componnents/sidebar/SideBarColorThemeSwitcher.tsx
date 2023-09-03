import * as Chakra from "@chakra-ui/react";
import "@mangadex/resources/css/sidebar.css";
import { FiMoon, FiSun } from "react-icons/fi";
import { Menu, MenuItem } from "react-pro-sidebar";
import { useBackgroundColorHover } from "./ActualSidebar";

export default function SideBarColorThemeSwitcher() {
    const onHover = useBackgroundColorHover();
    const { colorMode, toggleColorMode } = Chakra.useColorMode();
    return (
        <Menu
            rootStyles={{
                marginBottom: "20px",
                marginTop: "20px"
            }}
            menuItemStyles={{
                button: {
                    ":hover": {
                        backgroundColor: onHover
                    }
                }
            }}
            onClick={toggleColorMode}
        >
            <MenuItem
                icon={
                    colorMode === "light" ? <FiSun fontSize={"20px"} /> : <FiMoon fontSize={"20px"} />
                }
            >
                Toggle {colorMode === "light" ? "Dark" : "Light"}
            </MenuItem>
        </Menu>
    );
}