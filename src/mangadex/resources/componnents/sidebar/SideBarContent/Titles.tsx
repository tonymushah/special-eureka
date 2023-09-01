import { FiBook } from "react-icons/fi";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { MangaDexPath } from ".";
import { useBackgroundColor, useBackgroundColorHover } from "../ActualSidebar";


export function Titles() {
    const hoverBackgroundColor = useBackgroundColorHover();
    const backgroundColor = useBackgroundColor();
    return (
        <SubMenu
            icon={<FiBook fontSize={"20px"} />}
            label="Titles"
            rootStyles={{
                backgroundColor: "inherit"
            }}
        >
            <Menu
                menuItemStyles={{
                    button: {
                        backgroundColor,
                        ":hover": {
                            backgroundColor: hoverBackgroundColor
                        }
                    }
                }}
            >
                <MenuItem
                    component={<Link
                        to={MangaDexPath + "download"} />}
                >
                    Offline Library
                </MenuItem>
                <MenuItem
                    component={<Link to={MangaDexPath + "titles/recently-added"} />}
                >Recently Added</MenuItem>
                <MenuItem
                    component={<Link to={MangaDexPath + "titles/latest-updates"} />}
                >Latest Updates</MenuItem>
                <MenuItem
                    component={<Link to={MangaDexPath + "manga/random"} />}
                >
                    Random
                </MenuItem>
                <MenuItem
                    component={<Link to={MangaDexPath + "titles/recently-popular"} />}
                >
                    Recently Popular
                </MenuItem>
            </Menu>
        </SubMenu>
    );
}
