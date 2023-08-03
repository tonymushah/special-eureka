import * as Chakra from "@chakra-ui/react";
import "flag-icons/css/flag-icons.min.css";
import React from "react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import TryCatch from "@commons-res/components/TryCatch";
import IsPingable from "@mangadex/resources/componnents/IsPingable";
import { MangaPageProps } from "../../Manga_Page";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import Loading from "../loading";
import { UseQueryResult } from "@tanstack/react-query";

const Online_Chapter_Lang_Chooser = React.lazy(() => import("./Online_Chapter_Lang_Chooser"));

const Manga_Page_Aggregate = React.lazy(() => import("./Manga_Page_Aggregate"));

const Manga_Page_Aggregate_Offline = React.lazy(() => import("./Manga_Page_Aggregate_Offline"));

function OnError(query: UseQueryResult<boolean, Error>, props_: MangaPageProps) {
    return (
        <Chakra.Box>
            <Chakra.Alert status="error">
                <Chakra.AlertIcon />
                <Chakra.AlertTitle>Can&apos;t ping the Mangadex API</Chakra.AlertTitle>
                <Chakra.AlertDescription>
                    <Chakra.Button isLoading={query.fetchStatus == "fetching"} onClick={() => query.refetch()} colorScheme={"orange"}>Refresh</Chakra.Button>
                </Chakra.AlertDescription>
            </Chakra.Alert>
            <React.Suspense
                fallback={
                    <Chakra.Box m={2} bg="inherit">
                        <Loading />
                    </Chakra.Box>
                }
            >
                <Manga_Page_Aggregate_Offline
                    src={props_.src}
                />
            </React.Suspense>
        </Chakra.Box>
    );
}

function Catch(props: MangaPageProps) {
    return (
        <Manga_Page_Aggregate
            src={props.src}
        />
    );
}

function OnSuccess(props_: MangaPageProps) {
    return (
        <TryCatch
            catch={() => Catch(props_)}
        >
            <React.Suspense
                fallback={
                    <Chakra.Box m={2} bg="inherit">
                        <Loading />
                    </Chakra.Box>
                }
            >
                <Online_Chapter_Lang_Chooser
                    src={props_.src}
                />
            </React.Suspense>

        </TryCatch>
    );
}

export default function Online_Chapter(props: MangaPageProps) {
    const client = useHTTPClient();
    return (
        <ChakraContainer>
            <IsPingable
                client={client}
                onError={(query) => OnError(query, props)}
                onSuccess={() => OnSuccess(props)}
                onLoading={
                    <Chakra.Box m={2} bg="inherit">
                        <Loading />
                    </Chakra.Box>
                }
            />
        </ChakraContainer>
    );
}