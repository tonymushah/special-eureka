import * as Chakra from "@chakra-ui/react";
import { getMangaDexPath, trackEvent } from "@mangadex/index";
import { User } from "@mangadex/api/structures/User";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";
import { Outlet, useOutletContext } from "react-router";
import { Link } from "react-router-dom";
import UserPage_Links from "./UserPage_Links";

const MangadexPath = getMangaDexPath();

type UserPage_OutletContext = {
    user : User
}

export function useUserPageOutlet(){
    return useOutletContext<UserPage_OutletContext>();
}

export default function UserPage(props: React.PropsWithChildren<{
    user: User
}>) {
    const links: UserPage_Links[] = [
        {
            title: "User Information",
            "link_to": `${MangadexPath}/user/${props.user.get_id()}/`,
            tabPanelChildren: (
                <Outlet context={props}/>
            ),
            key: "user-inf"
        },
        {
            title: "Feed",
            "link_to": `${MangadexPath}/user/${props.user.get_id()}/feed`,
            tabPanelChildren: (
                <Outlet context={props}/>
            ),
            key: "user-feed"
        }
    ];
    React.useEffect(() => {
        appWindow.setTitle(`${props.user.get_username()} | Mangadex`);
        trackEvent("mangadex-user-page", {
            type : "user",
            id : props.user.get_id()
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
                <Chakra.Tabs
                    variant={"enclosed"}
                >
                    <Chakra.TabList>
                        {links.map((value) => (
                            <Chakra.Tab as={Link} to={value.link_to} key={value.key}>{value.title}</Chakra.Tab>
                        ))}
                    </Chakra.TabList>
                    <Chakra.TabPanels>
                        {links.map((value) => (
                            <Chakra.TabPanel key={value.key}>{
                                value.tabPanelChildren
                            }</Chakra.TabPanel>
                        ))}
                    </Chakra.TabPanels>
                </Chakra.Tabs>
            </Chakra.Box>
        </Chakra.Box>
    );
}
