import React from "react";
import { useManga } from ".";
import Manga from "../../api/structures/Manga";
import IsPingable from "../../resources/componnents/IsPingable";
import { Covers_Manga } from "../../resources/componnents/mangas/Mainpage/Covers_";

import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "../../../commons-res/components/HTTPClientProvider";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import { UseQueryResult } from "@tanstack/react-query";

function OnError(query: UseQueryResult<boolean, Error>) {
    return (
        <Chakra.Alert status={"error"}>
            <Chakra.AlertIcon />
            <Chakra.AlertTitle>Can&apos;t find Mangadex Website</Chakra.AlertTitle>
            <Chakra.AlertDescription>
                <Chakra.Button
                    colorScheme={"green"}
                    onClick={() => query.refetch()}
                >
                    Refresh
                </Chakra.Button>
            </Chakra.AlertDescription>
        </Chakra.Alert>
    );
}

function InnertOnSuccess(){
    const toUse: Manga = useManga().toUse;
    return (
        <Covers_Manga src={toUse}/>
    );
}

function OnSuccess() {
    return(
        <InnertOnSuccess/>
    );
}

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