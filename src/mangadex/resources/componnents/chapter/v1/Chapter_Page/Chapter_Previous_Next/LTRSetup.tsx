import React from "react";
import { NextButton } from "./NextButton";
import { PreviousButton } from "./PreviousButton";

export function LTRSetup() {
    return (
        <React.Fragment>
            <PreviousButton />
            <NextButton />
        </React.Fragment>
    );
}
