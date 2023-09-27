import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Author_Artists } from "@mangadex/resources/componnents/mangas/Mainpage/Top_chap/Manga_Info/Author_Artists";
import { Genre } from "@mangadex/resources/componnents/mangas/Mainpage/Top_chap/Manga_Info/Genre";
import { Theme } from "@mangadex/resources/componnents/mangas/Mainpage/Top_chap/Manga_Info/Theme";
import { Format } from "@mangadex/resources/componnents/mangas/Mainpage/Top_chap/Manga_Info/Format";
import { Content } from "@mangadex/resources/componnents/mangas/Mainpage/Top_chap/Manga_Info/Content";
import { Demographics } from "@mangadex/resources/componnents/mangas/Mainpage/Top_chap/Manga_Info/Demographics";
import { Links } from "@mangadex/resources/componnents/mangas/Mainpage/Top_chap/Manga_Info/Links";
import { AltTitles } from "@mangadex/resources/componnents/mangas/Mainpage/Top_chap/Manga_Info/AltTitles";
import { LatestChapter } from "@mangadex/resources/componnents/mangas/Mainpage/Top_chap/Manga_Info/LatestChapter";

const CollapseHeight = React.lazy(() => import("../utils/CollapseHeight"));

export default function Manga_Info() {
    return (
        <React.Suspense
            fallback={<Chakra.Alert status="loading">
                <Chakra.AlertIcon />
                <Chakra.AlertTitle>Loading...</Chakra.AlertTitle>
            </Chakra.Alert>}
        >
            <CollapseHeight>
                <Chakra.VStack alignItems={"start"}>
                    <Chakra.Wrap spacing={5}>
                        <Author_Artists />
                        <Genre />
                        <Theme />
                        <Format />
                        <Content />
                        <Demographics />
                        <Links />
                    </Chakra.Wrap>
                    <AltTitles />
                    <LatestChapter />
                </Chakra.VStack>
            </CollapseHeight>
        </React.Suspense>
    );
}
