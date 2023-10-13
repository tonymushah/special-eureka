import { FiHome } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useMangaDexPath } from "@mangadex/index";
import { RiHomeFill } from "react-icons/ri";

export function HomeIcon() {
    const location = useLocation();
    const mdPath = useMangaDexPath();
    if (location.pathname == mdPath || location.pathname == `${mdPath}/`) {
        return (
            <RiHomeFill fontSize={"20px"} />
        );
    } else {
        return (
            <FiHome fontSize={"20px"} />
        );
    }
}
