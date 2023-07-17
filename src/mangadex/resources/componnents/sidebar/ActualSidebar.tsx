import "@mangadex/resources/css/sidebar.css";
import useRTLSidebar from "@mangadex/resources/hooks/userOptions/RtlSidebar";
import { Sidebar, sidebarClasses } from "react-pro-sidebar";
import SideBarContent from "./SideBarContent";
import SideBarUserOption from "./SideBarUserOption";
import SidebarTop from "./SidebarTop";

export default function ActualSidebar() {
    const { query } = useRTLSidebar();
    return (
        <Sidebar
            breakPoint={"md"}
            collapsedWidth="70px"
            rtl={query.data}
            rootStyles={{
                [`.${sidebarClasses.container}`]: {
                    backgroundColor: "#2c2c2c",
                    color: "#f2f2f2",
                },
                height: "100vh",
            }}
            backgroundColor="#2c2c2c"
            defaultCollapsed
        >
            <SidebarTop />
            <SideBarUserOption />
            <SideBarContent />
        </Sidebar>
    );
}