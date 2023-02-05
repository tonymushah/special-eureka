import { invoke } from "@tauri-apps/api/tauri";
import React from "react";
import { Await } from "react-router";

export default function Close_splashscreen() {
    return (
        <React.Suspense>
            <Await
                resolve={invoke("close_splashscreen")}
            >
            </Await>
        </React.Suspense>
    );
}
