import TryCatch from "@commons-res/components/TryCatch";
import { Mangadex_suspense } from "@mangadex/index";
import React from "react";
import { ShowErrorDefault } from "../router/error/ShowErrorDefault";

function OnError(e: Error) {
    return (
        <ShowErrorDefault error={e} />
    );
}

export default function MyErrorBounderies(props: React.PropsWithChildren) {
    return (
        <TryCatch
            catch={OnError}
        >
            <Mangadex_suspense>
                {
                    props.children
                }
            </Mangadex_suspense>
        </TryCatch>
    );
}