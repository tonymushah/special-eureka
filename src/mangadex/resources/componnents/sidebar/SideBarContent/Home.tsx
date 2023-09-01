import { FiHome } from "react-icons/fi";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { MangaDexPath } from ".";


export function Home() {
    return (
        <MenuItem
            icon={<FiHome fontSize={"20px"}/>}
            component={<Link to={MangaDexPath} />}
        >
            Home
        </MenuItem>
    );
}
