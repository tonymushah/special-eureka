import React from "react";
import { NextButton } from "./NextButton";
import { PreviousButton } from "./PreviousButton";

export function RTLSetup() {
    return (
        <React.Fragment>
            <NextButton leftIcon />
            <PreviousButton rightIcon />
        </React.Fragment>
    );
}
