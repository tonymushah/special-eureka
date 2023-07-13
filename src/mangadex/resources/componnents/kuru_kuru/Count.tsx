import React from "react";
import { useClickCount } from "./atom";

export default function Count() {
    const [clickCount,] = useClickCount();
    if (clickCount < 2) {
        return (
            <React.Fragment>
                {
                    clickCount
                }
                &nbsp;
                time
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                {
                    clickCount
                }
                &nbsp;
                times
            </React.Fragment>
        );
    }

}