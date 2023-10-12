import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { MangaDexPath } from "..";
import { HomeIcon } from "./HomeIcon";

export function Home() {
    return (
        <MenuItem
            icon={<HomeIcon/>}
            component={<Link to={MangaDexPath} />}
        >
            Home
        </MenuItem>
    );
}
