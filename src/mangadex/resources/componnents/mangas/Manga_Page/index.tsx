import * as Chakra from "@chakra-ui/react";
import Manga from "@mangadex/api/structures/Manga";
import { useMangaTitle } from "@mangadex/resources/componnents/mangas/v1/MangaTitle";
import { appWindow } from "@tauri-apps/api/window";
import "flag-icons/css/flag-icons.min.css";
import React from "react";
import { PropsProvider } from "../v1/MangaElementDef/vanilla";
import TopInfo from "./Top";

export type MangaPageProps = {
    src: Manga
}

export function Manga_Page(props: React.PropsWithChildren<MangaPageProps>) {
    const title = useMangaTitle({
        src: props.src
    });
    React.useEffect(() => {
        appWindow.setTitle(`${title} | Mangadex`).then();
    }, []);
    return (
        <Chakra.Box>
            <PropsProvider value={{
                src: props.src
            }}>
                <TopInfo />
            </PropsProvider>
            <Chakra.Box>
                {props.children}
            </Chakra.Box>
        </Chakra.Box>
    );
}
