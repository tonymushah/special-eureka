import "@mangadex/resources/css/sidebar.css";
import useRTLSidebar from "@mangadex/resources/hooks/userOptions/RtlSidebar";
import React from "react";
import Hotkeys from "react-hot-keys";
import { useProSidebar } from "react-pro-sidebar";
import { useChapterFullscreen } from "../chapter/fullscreen/useChapterFullscreen";
import ActualSidebar from "./ActualSidebar";
import { Box } from "@chakra-ui/react";

function TheSideBar(){
    const { query } = useChapterFullscreen();
    return (
        <Box 
            display={query.data == true ? "none" : "initial"}
        >
            <ActualSidebar />
        </Box>
    );
}

export default function Side_bar() {
    const { toggleSidebar } = useProSidebar();
    const { toggle } = useRTLSidebar();
    
    return (
        <React.Fragment>
            <Hotkeys
                keyName="ctrl+p"
                onKeyDown={() => {
                    toggleSidebar();
                    console.log("ctrl+p");
                }}
            />
            <Hotkeys
                keyName="ctrl+r"
                onKeyDown={(_s, e) => {
                    e.preventDefault();
                    toggle();
                }}
            />
            <TheSideBar/>
        </React.Fragment>
    );
}
