import React from "react";
import { useManga } from "..";
import Covers_Offline from "@mangadex/resources/componnents/mangas/Mainpage/Covers_Offline";

export function InnertOnError() {
    const { toUse: src } = useManga();
    return (
        <Covers_Offline src={src} />
    );
}
