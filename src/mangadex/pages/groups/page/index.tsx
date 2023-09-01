import * as Chakra from "@chakra-ui/react";
import { Group } from "@mangadex/api/structures/Group";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import { Client } from "@tauri-apps/api/http";
import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Success } from "./Success";

export const Group_Page = React.lazy(() => import("@mangadex/resources/componnents/groups/Group_Page"));

export function Group_Page_Suspense(props: React.PropsWithChildren) {
    return (
        <React.Suspense
            fallback={
                <Chakra.AbsoluteCenter>
                    <Chakra.Box>
                        <MangadexSpinner
                            size={"lg"}
                        />
                    </Chakra.Box>
                </Chakra.AbsoluteCenter>
            }
        >
            {
                props.children
            }
        </React.Suspense>
    );
}

export type GroupRouteOutletContext = {
    group: Group
}

export function useGroupRouteOutletContext(): GroupRouteOutletContext {
    return useOutletContext<GroupRouteOutletContext>();
}

export function queryFn(id : string, client: Client): Promise<Group> {
    return Group.get_groupById(id, client);
}

export function queryKey(id: string) {
    return ["mdx", "group", id];
}

export default function Group_Page_() {
    const { id } = useParams();
    const setTitle = useAppWindowTitle();
    React.useEffect(() => {
        setTitle("Loading... | Mangadex");
    }, []);
    if (id != undefined) {
        return (
            <Success id={id} />
        );
    } else {
        setTitle("Error on loading the group page | Mangadex");
        return (
            <Chakra.Alert status="error">
                <Chakra.AlertIcon />
                <Chakra.AlertTitle>
                    The group id is null
                </Chakra.AlertTitle>
            </Chakra.Alert>
        );
    }
}

export { loader } from "./loader";
