import { ThemeTypings } from "@chakra-ui/react";
import { To } from "react-router";
import Dashboard_logo from "@commons-res/common-icon/eureka-logo6.svg";
import MangadexLogo from "@mangadex/resources/ico/ddb5721c5458b5edc9d6782a5f107119.svg";
export interface WebSite {
    name: string,
    route: To,
    icon: any,
    label: string,
    button_colorScheme? : ThemeTypings["colorSchemes"]
}

const supported_websites : Array<WebSite> = [
    {
        name: "Dashboard",
        route: "/",
        icon: Dashboard_logo,
        label: "The special eureka home"
    },
    {
        name: "Mangadex",
        route: "/mangadex",
        icon: MangadexLogo,
        label: "High Quality Images, no ads",
        button_colorScheme: "orange"
    }
];

export default supported_websites;