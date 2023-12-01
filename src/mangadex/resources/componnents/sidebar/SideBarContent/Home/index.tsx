import { MenuItem } from "react-pro-sidebar";
import { Link } from "@router";
import { HomeIcon } from "./HomeIcon";

export function Home() {
    return (
        <MenuItem
            icon={<HomeIcon />}
            component={<Link to={"/mangadex"} />}
        >
            Home
        </MenuItem>
    );
}
