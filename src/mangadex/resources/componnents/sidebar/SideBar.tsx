import "@mangadex/resources/css/sidebar.css";
import useRTLSidebar from "@mangadex/resources/hooks/userOptions/RtlSidebar";
import React from "react";
import Hotkeys from "react-hot-keys";
import { useProSidebar } from "react-pro-sidebar";
import { useChapterFullscreen } from "../chapter/fullscreen/Context";
import ActualSidebar from "./ActualSidebar";

export default function Side_bar() {
    const { toggleSidebar } = useProSidebar();
    const { toggle } = useRTLSidebar();
    const { query } = useChapterFullscreen();
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
                onKeyDown={() => {
                    toggle();
                }}
            />
            {
                query.data == true ? (
                    <React.Fragment />
                ) : (
                    <ActualSidebar />
                )
            }
        </React.Fragment>
    );
}
