import * as Chakra from "@chakra-ui/react";
import { Author } from "@mangadex/api/structures/Author";
import React from "react";
import { PixivButton } from "./PixivButton";
import { TwitterButton } from "./TwitterButton";
import { MelonBookButton } from "./MelonBookButton";
import { FanboxButton } from "./FanboxButton";
import { BoothButton } from "./BoothButton";
import { NicoVideoButton } from "./NicoVideoButton";
import { SkebButton } from "./SkebButton";
import { FantiaButton } from "./FantiaButton";
import { TumblrButton } from "./TumblrButton";
import { YoutubeButton } from "./YoutubeButton";
import { WeiboButton } from "./WeiboButton";
import { NaverButton } from "./NaverButton";

export const ExtLink = React.lazy(async () => {
    const res = await import("@commons-res/components/ExtLink");
    return {
        default: res.ExtLink
    };
});

const context = React.createContext<Author | undefined>(undefined);

export function useAuthorPageSocialsAuthor() {
    const data = React.useContext(context);
    if (data == undefined) {
        throw new Error("The Author_Page_SocialsContextProvider should be provided");
    } else {
        return data;
    }
}

function Author_Page_SocialsContextProvider({ value, children }: React.PropsWithChildren<{
    value: Author
}>) {
    return (
        <context.Provider value={value}>
            {children}
        </context.Provider>
    );
}

export default function Author_Page_Socials(props: {
    src: Author
}) {
    return (
        <Author_Page_SocialsContextProvider value={props.src}>
            <Chakra.ButtonGroup>
                <TwitterButton />
                <PixivButton />
                <MelonBookButton />
                <FanboxButton />
                <BoothButton />
                <NicoVideoButton />
                <SkebButton />
                <FantiaButton />
                <TumblrButton />
                <YoutubeButton />
                <WeiboButton />
                <NaverButton />
            </Chakra.ButtonGroup>
        </Author_Page_SocialsContextProvider>

    );
}