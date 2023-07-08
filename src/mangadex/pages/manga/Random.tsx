import { AbsoluteCenter, Spinner } from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Manga } from "@mangadex/api/structures/Manga";
import { ErrorELAsync1 } from "@mangadex/resources/componnents/Error_cmp";
import IsPingable from "@mangadex/resources/componnents/IsPingable";
import IsPingable_defaultError from "@mangadex/resources/componnents/IsPingable_defaultError";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";
import { Await, useNavigate } from "react-router-dom";
import { Mangadex_suspense, getMangaDexPath, useTrackEvent } from "@mangadex/index";

const MangaDexPath = getMangaDexPath();

export default function Random_Manga() {
    const client = useHTTPClient();
    appWindow.setTitle("Loading a Random Manga | Mangadex");
    useTrackEvent("mangadex-random-manga");
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
                );
            }}
            client={client}
            onSuccess={() => (
                <Mangadex_suspense>
                    <Await
                        resolve={Manga.getRandom(client)}
                        errorElement={<ErrorELAsync1 />}
                    >
                        {(getted1: Manga) => {
                            const navigate = useNavigate();
                            React.useEffect(() => {
                                navigate(MangaDexPath + "/manga/" + getted1.get_id());
                            });
                            return (<></>);
                        }}
                    </Await>
                </Mangadex_suspense>
            )}
        />

    );
}