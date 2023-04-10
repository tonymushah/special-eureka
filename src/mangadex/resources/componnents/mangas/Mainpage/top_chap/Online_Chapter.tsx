import * as Chakra from "@chakra-ui/react";
import "flag-icons/css/flag-icons.min.css";
import React from "react";
import { Container, Spinner } from "react-bootstrap";
import { useHTTPClient } from "../../../../../../commons-res/components/HTTPClientProvider";
import TryCatch from "../../../../../../commons-res/components/TryCatch";
import IsPingable from "../../../IsPingable";
import { MangaPageProps } from "../../Manga_Page";

const Online_Chapter_Lang_Chooser = React.lazy(() => import("./Online_Chapter_Lang_Chooser"));

const Manga_Page_Aggregate = React.lazy(() => import("./Manga_Page_Aggregate"));

export default function Online_Chapter(props: MangaPageProps) {
    const client = useHTTPClient();
    return (
        <Chakra.TabPanel>
            <Container>
                <IsPingable
                    client={client}
                    onError={(query) => (
                        <Chakra.Alert status="error">
                            <Chakra.AlertIcon />
                            <Chakra.AlertTitle>Can't ping the Mangadex API</Chakra.AlertTitle>
                            <Chakra.AlertDescription>
                                <Chakra.Button onClick={() => query.refetch()} colorScheme={"orange"}>Refresh</Chakra.Button>
                            </Chakra.AlertDescription>
                        </Chakra.Alert>
                    )}
                    onSuccess={(query) => (
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
                                            <Spinner
                                                animation="border"
                                            ></Spinner>
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
                                <Spinner
                                    animation="border"
                                ></Spinner>
                                <br />
                                <p>Loading chapters ...</p>
                            </div>
                        </Chakra.Box>
                    }
                />
            </Container>
        </Chakra.TabPanel >
    );
}