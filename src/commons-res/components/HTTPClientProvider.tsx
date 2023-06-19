import { Client } from "@tauri-apps/api/http";
import React from "react";

const context = React.createContext<Client | undefined>(undefined);

export default function HTTPClientProvider(props: React.PropsWithChildren<{
    value: Client
}>) {
    return (
        <context.Provider value={props.value}>{
            props.children
        }</context.Provider>
    );
}

export function useHTTPClient() : Client{
    const _context__ = React.useContext(context);
    if (_context__ == undefined) {
        throw new Error("Can't find the HTTPClient Context");
    } else {
        return _context__;
    }
}