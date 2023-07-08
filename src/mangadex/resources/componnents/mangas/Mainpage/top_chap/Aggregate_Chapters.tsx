import * as Chakra from "@chakra-ui/react";
import "flag-icons/css/flag-icons.min.css";
import React from "react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import TryCatch from "@commons-res/components/TryCatch";
import IsPingable from "@mangadex/resources/componnents/IsPingable";
import { MangaPageProps } from "../../Manga_Page";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";

const Online_Chapter_Lang_Chooser = React.lazy(() => import("./Online_Chapter_Lang_Chooser"));

const Manga_Page_Aggregate = React.lazy(() => import("./Manga_Page_Aggregate"));

const Manga_Page_Aggregate_Offline = React.lazy(() => import("./Manga_Page_Aggregate_Offline"));

export default function Online_Chapter(props: MangaPageProps) {
    const client = useHTTPClient();
    return (
        <ChakraContainer>
            <IsPingable
                client={client}
                onError={(query) => (
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
                                    <div className=" text-center">
                                        <Chakra.Spinner
                                             
                                        />
                                        <br />
                                        <p>Loading chapters ...</p>
                                    </div>
                                </Chakra.Box>
                            }
                        >
                            <Manga_Page_Aggregate_Offline
                                src={props.src}
                            />
                        </React.Suspense>
                    </Chakra.Box>
                )}
                onSuccess={() => (
                    <TryCatch
                        catch={() => (
                            <Manga_Page_Aggregate
                                src={props.src}
                            />
                        )}
                    >
                        <React.Suspense
                            fallback={
                                <Chakra.Box m={2} bg="inherit">
                                    <div className=" text-center">
                                        <Chakra.Spinner
                                             
                                        />
                                        <br />
                                        <p>Loading chapters ...</p>
                                    </div>
                                </Chakra.Box>
                            }
                        >
                            <Online_Chapter_Lang_Chooser
                                src={props.src}
                            />
                        </React.Suspense>

                    </TryCatch>
                )}
                onLoading={
                    <Chakra.Box m={2} bg="inherit">
                        <div className=" text-center">
                            <Chakra.Spinner
                                 
                            />
                            <br />
                            <p>Loading chapters ...</p>
                        </div>
                    </Chakra.Box>
                }
            />
        </ChakraContainer>
    );
}