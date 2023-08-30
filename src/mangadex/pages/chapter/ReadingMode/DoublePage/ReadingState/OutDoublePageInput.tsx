import React from "react";
import { DoublePageImageInput } from "../hooks/useDoublePageImageQuery";
import { _getLastInURL_ } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";

export default function OutDoublePageInput({ value }: {
    value: DoublePageImageInput;
}) {
    if (typeof value == "string") {
        return (
            <React.Fragment>
                {parseInt(_getLastInURL_(value)?.match(/\d+/)?.[0] ?? "0")}
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                {parseInt(_getLastInURL_(value[0])?.match(/\d+/)?.[0] ?? "0")} - {parseInt(_getLastInURL_(value[1])?.match(/\d+/)?.[0] ?? "0")}
            </React.Fragment>
        );
    }
}
