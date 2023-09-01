import React from "react";
import { MenuItem } from "react-pro-sidebar";
import MangadexSpinner from "../../kuru_kuru/MangadexSpinner";

const Downloads_badge_ = React.lazy(() => import("../Download_badge"));

const Downloads_badge_With_Server_Icon = React.lazy(() => import("../Download_Badge_with_Server_Icon"));

export function Offline_Server() {
    return (
        <MenuItem
            icon={<React.Suspense
                fallback={<MangadexSpinner />}
            >
                <Downloads_badge_With_Server_Icon />
            </React.Suspense>}
            suffix={<React.Suspense
                fallback={<MangadexSpinner />}
            >
                <Downloads_badge_ />
            </React.Suspense>}
        >
            Offline Server
        </MenuItem>
    );
}
