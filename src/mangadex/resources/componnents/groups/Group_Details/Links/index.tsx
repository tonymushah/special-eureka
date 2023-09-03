import * as Chakra from "@chakra-ui/react";
import { useGroupRouteOutletContext } from "@mangadex/pages/groups/page";
import React from "react";
import { ContactEmail } from "./ContactEmail";
import { Discord } from "./Discord";
import { IrcChannel } from "./IrcChannel";
import { IrcServer } from "./IrcServer";
import { MangaUpdates } from "./MangaUpdates";
import { Twitter } from "./Twitter";
import { Website } from "./Website";

export const ExtLink = React.lazy(async () => {
    const res = await import("@commons-res/components/ExtLink");
    return {
        default: res.ExtLink
    };
});

export default function Links() {
    const { group: src } = useGroupRouteOutletContext();
    if (src.hasLinks()) {
        return (
            <Chakra.Box>
                <Chakra.Heading fontFamily={"inherit"} size={"md"}>Where to find</Chakra.Heading>
                <React.Suspense
                >
                    <Chakra.Wrap>
                        <Chakra.WrapItem>
                            <Website />
                        </Chakra.WrapItem>
                        <Chakra.WrapItem>
                            <Discord />
                        </Chakra.WrapItem>
                        <Chakra.WrapItem>
                            <ContactEmail />
                        </Chakra.WrapItem>
                        <Chakra.WrapItem>
                            <MangaUpdates />
                        </Chakra.WrapItem>
                        <Chakra.WrapItem>
                            <Twitter />
                        </Chakra.WrapItem>
                        <Chakra.WrapItem>
                            <IrcChannel />
                        </Chakra.WrapItem>
                        <Chakra.WrapItem>
                            <IrcServer/>
                        </Chakra.WrapItem>
                    </Chakra.Wrap>
                </React.Suspense>
            </Chakra.Box>
        );
    } else {
        return (<React.Fragment />);
    }

}
