import React from "react";
import { useProps } from "../../v1/MangaElementDef/vanilla";
import { useMangaAltTitle } from "../../v1/MangaTitle";

export default function AltTitle() {
    const { src } = useProps();
    const altTitle = useMangaAltTitle({
        src
    });
    return (
        <React.Fragment>
            {
                altTitle
            }
        </React.Fragment>
    );
}