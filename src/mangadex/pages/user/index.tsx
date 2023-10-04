import * as Chakra from "@chakra-ui/react";
import { trackEvent } from "@mangadex/index";
import { User } from "@mangadex/api/structures/User";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";
import { Outlet, useOutletContext } from "react-router";
import ButtonsNavigation from "./ButtonsNavigation";

type UserPage_OutletContext = {
    user: User
}

export function useUserPageOutlet() {
    return useOutletContext<UserPage_OutletContext>();
}

export default function UserPage(props: React.PropsWithChildren<{
    user: User
}>) {
    React.useEffect(() => {
        appWindow.setTitle(`${props.user.get_username()} | Mangadex`);
        trackEvent("mangadex-user-page", {
            type: "user",
            id: props.user.get_id()
        });
    }, [
        props.user
    ]);
    const bg = Chakra.useColorModeValue("gray.400", "gray.600");
    return (
        <Chakra.Box>
            <Chakra.Box bg={bg} p={4}>
                <Chakra.Heading fontFamily={"inherit"}>{props.user.get_username()}</Chakra.Heading>
            </Chakra.Box>
            <Chakra.Box>
                <Chakra.Box>
                    <ButtonsNavigation />
                </Chakra.Box>
                <Outlet context={{ user: props.user }} />
            </Chakra.Box>
        </Chakra.Box>
    );
}
