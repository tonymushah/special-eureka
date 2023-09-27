import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { Title } from "../Title";
import { useHomeLatest_Updates } from "..";
import { LatestUpdateFeedElement } from "./LatestUpdateFeedElement";

export function OnSuccess() {
    const query = useHomeLatest_Updates();
    if (query.isSuccess) {
        return (
            <Chakra.Box>
                <Title />
                <Chakra.Wrap>
                    {query.data.get_data().map((value: Chapter) => (
                        <LatestUpdateFeedElement value={value} key={value.get_id()}/>
                    ))}
                </Chakra.Wrap>
            </Chakra.Box>
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}
