import * as Chakra from "@chakra-ui/react";
import MangaElementFallback from "@mangadex/resources/componnents/mangas/v1/MangaElementFallback";
import React from "react";
import { Title } from "./Title";

function Fallback({ fallbacksNumber } : {
    fallbacksNumber : number
}) {
    const fallbacks = React.useMemo(() => {
        const array: React.ReactNode[] = [];
        for (let index = 0; index < fallbacksNumber; index++) {
            array.push(
                <Chakra.WrapItem key={`LatestUpdateFallback${index}`}>
                    <MangaElementFallback />
                </Chakra.WrapItem>
            );
        }
        return array;
    }, [fallbacksNumber]);
    return (
        <Chakra.Wrap>
            {
                fallbacks
            }
        </Chakra.Wrap>
    );
}

export function OnLoading({ fallbacksNumber } : {
    fallbacksNumber : number
}) {
    return (
        <Chakra.Box>
            <Title />
            <Fallback fallbacksNumber={fallbacksNumber} />
        </Chakra.Box>
    );
}
