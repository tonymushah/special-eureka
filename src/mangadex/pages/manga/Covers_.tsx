import React from "react";
import { useManga } from ".";
import { Manga } from "../../api/structures/Manga";
import IsPingable from "../../resources/componnents/IsPingable";
import { Covers_Manga } from "../../resources/componnents/mangas/Mainpage/Covers_";

import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "../../../commons-res/components/HTTPClientProvider";

export default function Covers_() {
    const toUse: Manga = useManga().toUse;
    const client = useHTTPClient();
    return (
        <IsPingable
            client={client}
            onError={(query) => (
                <Chakra.Alert status={"error"}>
                    <Chakra.AlertIcon />
                    <Chakra.AlertTitle>Can't find Mangadex Website</Chakra.AlertTitle>
                    <Chakra.AlertDescription>
                        <Chakra.Button
                            colorScheme={"green"}
                            onClick={() => query.refetch()}
                        >
                            Refresh
                        </Chakra.Button>
                    </Chakra.AlertDescription>
                </Chakra.Alert>
            )}
            onLoading={
                <Chakra.AbsoluteCenter>
                    <Chakra.Spinner
                        size={"lg"}
                    />
                </Chakra.AbsoluteCenter>
            }
            onSuccess={() => (
                <Covers_Manga src={toUse}></Covers_Manga>
            )}
        />

    );
}