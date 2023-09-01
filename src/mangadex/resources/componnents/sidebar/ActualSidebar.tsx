import "@mangadex/resources/css/sidebar.css";
import useRTLSidebar from "@mangadex/resources/hooks/userOptions/RtlSidebar";
import { Sidebar, sidebarClasses } from "react-pro-sidebar";
import SideBarContent from "./SideBarContent";
import SideBarUserOption from "./SideBarUserOption";
import SidebarTop from "./SidebarTop";
import { useColorModeValue, useToken } from "@chakra-ui/system";
import SideBarColorThemeSwitcher from "./SideBarColorThemeSwitcher";

export default function ActualSidebar() {
    const { query } = useRTLSidebar();
    const backgroundColor = useBackgroundColor();
    const borderColor = useBorderColor();
    const color = useColor();
    return (
        <Sidebar
            breakPoint={"md"}
            rtl={query.data}
            rootStyles={{
                [`.${sidebarClasses.container}`]: {
                    backgroundColor: backgroundColor,
                    color: color,
                    alignItems : "center"
                },
                borderColor,
                boxShadow : `0px 0px 15px ${borderColor}`,
                height: "100vh",
            }}
            backgroundColor={backgroundColor}
            defaultCollapsed
        >
            <SidebarTop />
            <SideBarColorThemeSwitcher/>
            <SideBarContent />
            <SideBarUserOption />
        </Sidebar>
    );
}

export function useColor() {
    const white = useToken("colors", "white");
    const black = useToken("colors", "black");
    const color = useColorModeValue(black, white);
    return color;
}

export function useBackgroundColor() {
    const [light, dark] = useToken("colors", ["gray.300", "gray.800"]);
    const backgroundColor = useColorModeValue(light, dark);
    return backgroundColor;
}

export function useBackgroundColorHover() {
    const [light, dark] = useToken("colors", ["gray.400", "gray.700"]);
    const backgroundColor = useColorModeValue(light, dark);
    return backgroundColor;
}

export function useBorderColor() {
    const [light, dark] = useToken("colors", ["gray.400", "gray.600"]);
    const backgroundColor = useColorModeValue(light, dark);
    return backgroundColor;
}