import React from "react";
import { register, unregister } from "@tauri-apps/api/globalShortcut";
import invokeHerta from "./invocation";

export default function RegisterHertaHotKeys(){
    const keys = React.useMemo(() => {
        return "CmdOrControl+H";
    }, []);
    React.useEffect(() => {
        register(keys, () => {
            invokeHerta();
        });
        return () => {
            unregister(keys);
        };
    });
    return (
        <React.Fragment/>
    );
}