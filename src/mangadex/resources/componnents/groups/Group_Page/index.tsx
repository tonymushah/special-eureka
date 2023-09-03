import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Group } from "@mangadex/api/structures/Group";
import { trackEvent } from "@mangadex/index";
import { UseQueryResult } from "@tanstack/react-query";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";
import { BottomContent } from "./BottomContent";
import OnSuccess from "./OnSuccess";
import WaveHaikei_ from "../wave-haikei-1.svg";
import WaveHaikeiDark_ from "../wave-haikei.svg";

const IsPingable = React.lazy(() => import("../../IsPingable"));

const group_page_context = React.createContext<Group | undefined>(undefined);

export function useGroupPageContext(): Group {
    const value = React.useContext(group_page_context);
    if (value == undefined) {
        throw new Error("The Group_Page context value is undefined");
    } else {
        return value;
    }
}

function OnError(query: UseQueryResult<boolean, Error>) {
    return (
        <Chakra.Box>
            <Chakra.Button
                onClick={() => query.refetch()}
                colorScheme={"orange"}
                isLoading={query.fetchStatus === "fetching"}
            >
                Refretch
            </Chakra.Button>
        </Chakra.Box>
    );
}
export default function Group_Page(props: React.PropsWithChildren<{
    src: Group
}>) {
    const client = useHTTPClient();
    React.useEffect(() => {
        appWindow.setTitle(`${props.src.get_name()} | Mangadex`).then();
        trackEvent("mangadex-group-page", {
            type: "group",
            id: props.src.get_id()
        });
    }, []);
    const WaveHaikei = Chakra.useColorModeValue(WaveHaikei_, WaveHaikeiDark_);
    return (
        <group_page_context.Provider value={props.src}>
            <Chakra.Box minHeight={"100vh"} >
                <Chakra.Box
                    height={"sm"}
                    backgroundImage={WaveHaikei}
                    backgroundPosition={"bottom"}
                    backgroundRepeat={"no-repeat"}
                    backgroundSize={"cover"}
                >
                    <Chakra.Center height={"full"}>
                        <Chakra.Box textAlign={"center"}>
                            <Chakra.Heading fontFamily={"inherit"}>{props.src.get_name()}</Chakra.Heading>
                            <React.Suspense
                                fallback={
                                    <Chakra.Text>Loading...</Chakra.Text>
                                }
                            >
                                <IsPingable
                                    onLoading={
                                        <Chakra.Text>Loading...</Chakra.Text>
                                    }
                                    onSuccess={OnSuccess}
                                    onError={OnError}
                                    client={client}
                                />
                            </React.Suspense>
                        </Chakra.Box>
                    </Chakra.Center>
                </Chakra.Box>
                <BottomContent src={props.src}>
                    {props.children}
                </BottomContent>
            </Chakra.Box>
        </group_page_context.Provider>
    );
}


