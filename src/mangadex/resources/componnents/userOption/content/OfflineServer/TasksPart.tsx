import * as Chakra from "@chakra-ui/react";
import React from "react";
import BasicTwoElement from "../Base";

const Tasks = React.lazy(() => import("@mangadex/resources/componnents/userOption/utils/ServerTasksInfo"));

export default function TasksPart() {
    return (
        <BasicTwoElement title="Tasks">
            <Chakra.Box display={"block"} width={"100%"}>
                <React.Suspense
                    fallback={<Chakra.Progress isIndeterminate />}
                >
                    <Tasks />
                </React.Suspense>
            </Chakra.Box>
        </BasicTwoElement>
    );
}
