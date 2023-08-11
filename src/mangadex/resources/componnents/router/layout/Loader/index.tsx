import React from "react";

const ChapterFullScreenModeIniter = React.lazy(() => import("@mangadex/resources/componnents/chapter/fullscreen/Context"));

const UserOptionModal = React.lazy(() => import("@mangadex/resources/componnents/userOption/index"));

const RegisterHertaHotKeys = React.lazy(() => import("@mangadex/resources/componnents/kuru_kuru/HotKeys"));

const ServerAutoStartLoader = React.lazy(() => import("@mangadex/resources/componnents/loaders/ServerAutoStart"));

export default function Loader() {
    return (
        <React.Fragment>
            <RegisterHertaHotKeys />
            <ServerAutoStartLoader />
            <ChapterFullScreenModeIniter />
            <UserOptionModal />
        </React.Fragment>
    );
}