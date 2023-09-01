import { FiSearch } from "react-icons/fi";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { MangaDexPath } from ".";
import { useBackgroundColor, useBackgroundColorHover } from "../ActualSidebar";


export function Search() {
    const hoverBackgroundColor = useBackgroundColorHover();
    const backgroundColor = useBackgroundColor();
    return (
        <SubMenu
            icon={<FiSearch fontSize={"20px"} />}
            label="Search"
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
                    component={<Link to={MangaDexPath + "titles/search"} />}
                >
                    Manga
                </MenuItem>
                <MenuItem
                    component={<Link to={MangaDexPath + "author/search"} />}
                >
                    Author
                </MenuItem>
                <MenuItem
                    component={<Link to={MangaDexPath + "group/search"} />}
                >
                    Groups
                </MenuItem>
                <MenuItem>Chapter</MenuItem>
            </Menu>
        </SubMenu>
    );
}
