import * as Chakra from "@chakra-ui/react";
import { User } from "@mangadex/api/structures/User";
import UserFeed from "@mangadex/resources/componnents/user/userPage/UserFeed";
import UserPageInfo from "@mangadex/resources/componnents/user/userPage/UserPageInfo";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";
import UserPage_Links from "./UserPage_Links";

export default function UserPage(props: React.PropsWithChildren<{
    user: User
}>) {
    const links: UserPage_Links[] = [
        {
            title: "User Information",
            "link_to": "/",
            tabPanelChildren: (
                <UserPageInfo {...props} />
            ),
            key: "user-inf"
        },
        {
            title: "Feed",
            "link_to": "/",
            tabPanelChildren: (
                <React.Fragment>
                    <UserFeed user_id={props.user.get_id()}/>
                </React.Fragment>
            ),
            key: "user-feed"
        }
    ];
    React.useEffect(() => {
        appWindow.setTitle(`${props.user.get_username()} | Mangadex`);
    }, [
        props.user
    ]);
    return (
        <Chakra.Box>
            <Chakra.Box bg={"#d5d4d4"} p={4}>
                <Chakra.Heading fontFamily={"inherit"}>{props.user.get_username()}</Chakra.Heading>
            </Chakra.Box>
            <Chakra.Box>
                <Chakra.Tabs
                    variant={"enclosed"}
                >
                    <Chakra.TabList>
                        {links.map((value) => (
                            <Chakra.Tab key={value.key}>{value.title}</Chakra.Tab>
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
