import React from "react";
import { useParams } from "react-router";
import { DownloadButtonWithId } from "./DownloadButtonWithId";

export function DownloadButton() {
    const { id } = useParams();
    if (id != undefined) {
        return (
            <DownloadButtonWithId id={id} />
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}
