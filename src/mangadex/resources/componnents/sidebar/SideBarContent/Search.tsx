import { FiSearch } from "react-icons/fi";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "@router";
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
                    component={<Link to={"/mangadex/titles/search"} />}
                >
                    Manga
                </MenuItem>
                <MenuItem
                    component={<Link to={"/mangadex/author/search"} />}
                >
                    Author
                </MenuItem>
                <MenuItem
                    component={<Link to={"/mangadex/group/search"} />}
                >
                    Groups
                </MenuItem>
                {
                    /*
                        <MenuItem>Chapter</MenuItem>
                    */
                }
            </Menu>
        </SubMenu>
    );
}
