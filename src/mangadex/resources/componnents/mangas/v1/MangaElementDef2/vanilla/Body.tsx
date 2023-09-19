import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import IsPingable from "@mangadex/resources/componnents/IsPingable";
import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import Description from "./Description";
import MangaElementDef2_Stats from "./MangaElementDef2_Stats";
import Publication from "./Publication";
import Tags from "./Tags";
import Title from "./Title";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function OnError(_query: UseQueryResult<boolean, Error>) {
    return (<React.Fragment />);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function OnSuccess(_query: UseQueryResult<boolean, Error>) {
    return (<MangaElementDef2_Stats />);
}

export default function Body() {
    const client = useHTTPClient();
    return (
        <Chakra.CardBody marginTop={"0px"}>
            <Chakra.HStack spacing={"5px"}>
                <Title />
                <IsPingable
                    client={client}
                    onError={OnError}
                    onSuccess={OnSuccess}
                    onLoading={<Chakra.Skeleton height={"10px"} width={"20px"} />}
                />
                <Publication />
            </Chakra.HStack>
            <Chakra.Box textAlign={"start"}>
                <Tags />
                <Description />
            </Chakra.Box>
        </Chakra.CardBody>
    );
}