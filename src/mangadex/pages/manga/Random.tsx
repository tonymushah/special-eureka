import { AbsoluteCenter, Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Spinner, Text } from "@chakra-ui/react";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";
import { Await, useNavigate } from "react-router-dom";
import { getMangaDexPath, Mangadex_suspense } from "../..";
import { useHTTPClient } from "../../../commons-res/components/HTTPClientProvider";
import { Manga } from "../../api/structures/Manga";
import { ErrorELAsync1 } from "../../resources/componnents/Error_cmp";
import IsPingable from "../../resources/componnents/IsPingable";
import IsPingable_defaultError from "../../resources/componnents/IsPingable_defaultError";

const MangaDexPath = getMangaDexPath();

export default function Random_Manga() {
    const client = useHTTPClient();
    appWindow.setTitle("Loading a Random Manga | Mangadex");
    return (
        <IsPingable
            onLoading={
                <AbsoluteCenter>
                    <Spinner
                        size={"xl"}
                        colorScheme={"orange"}
                    />
                </AbsoluteCenter>
            }
            onError={(query) => {
                appWindow.setTitle("Error on loading a Random Manga | Mangadex");
                return (
                    <IsPingable_defaultError
                        query={query}
                    />
                )
            }}
            client={client}
            onSuccess={() => (
                <Mangadex_suspense>
                    <Await
                        resolve={Manga.getRandom(client)}
                        errorElement={<ErrorELAsync1 />}
                    >
                        {(getted1: Manga) => {
                            let navigate = useNavigate();
                            React.useEffect(() => {
                                navigate(MangaDexPath + "/manga/" + getted1.get_id())
                            });
                            return (<></>);
                        }}
                    </Await>
                </Mangadex_suspense>
            )}
        />

    )
}