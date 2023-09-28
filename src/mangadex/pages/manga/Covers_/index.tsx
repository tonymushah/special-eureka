import React from "react";
import IsPingable from "@mangadex/resources/componnents/IsPingable";

import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import { OnSuccess } from "./OnSuccess";
import { OnError } from "./OnError";

export default function Covers_() {

    const client = useHTTPClient();
    return (
        <IsPingable
            client={client}
            onError={OnError}
            onLoading={
                <Chakra.AbsoluteCenter>
                    <MangadexSpinner
                        size={"lg"}
                    />
                </Chakra.AbsoluteCenter>
            }
            onSuccess={OnSuccess}
        />
    );
}