import React from "react";
import { isRouteErrorResponse, useLocation, useRouteError } from "react-router";
import { appWindow } from "@tauri-apps/api/window";
import { ShowErrorDefault } from "./ShowErrorDefault";
import { ShowErrorResponse } from "./ShowErrorResponse";
import { ShowStringError } from "./ShowStringError";

export function RouteErrorBoundary() {
    const error = useRouteError();

    const location = useLocation();
    React.useEffect(() => {
        appWindow.setTitle(`Error on loading ${location.pathname}`);
    }, []);
    if (isRouteErrorResponse(error)) {
        if (error.error != undefined) {
            return (
                <ShowErrorDefault error={error.error} />
            );
        } else {
            return (
                <ShowErrorResponse error={error} />
            );
        }
    } else {
        if (error instanceof Error) {
            return (
                <ShowErrorDefault error={error} />
            );
        } else if (typeof error == "string") {
            return (
                <ShowStringError error={error} />
            );
        } else {
            return (
                <ShowErrorResponse error={error}/>
            );
        }
    }
}