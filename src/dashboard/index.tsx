import React from "react";
import Dashboard_logo from "@commons-res/common-icon/eureka-logo6.svg";
import { trackEvent as aptabaseTrackEvent } from "@aptabase/tauri";

export function trackEvent(name: string, payload?: {
    [key: string]: string | number
}) {
    aptabaseTrackEvent(name, {
        "website": "dashboard",
        "location": window.location.href,
        ...payload
    });
}

export function getDashboardPath() {
    return "/dashboard";
}

export function getLogo() {
    return Dashboard_logo;
}

export function getProjectPath() {
    return getDashboardPath();
}

export function useTrackEvent(name: string, payload?: {
    [key: string]: string | number
}) {
    React.useEffect(() => {
        trackEvent(name, payload);
    }, []);
}