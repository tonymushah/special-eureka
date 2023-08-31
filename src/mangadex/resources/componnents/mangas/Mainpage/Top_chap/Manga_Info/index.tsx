import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Author_Artists } from "./Author_Artists";
import { Genre } from "./Genre";
import { Theme } from "./Theme";
import { Format } from "./Format";
import { Content } from "./Content";
import { Demographics } from "./Demographics";
import { Links } from "./Links";
import { AltTitles } from "./AltTitles";
import { LatestChapter } from "./LatestChapter";

const CollapseHeight = React.lazy(() => import("../../top_chap/CollapseHeight"));

export default function Manga_Info() {
    return (
        <React.Suspense
            fallback={<Chakra.Alert status="loading">
                <Chakra.AlertIcon />
                <Chakra.AlertTitle>Loading...</Chakra.AlertTitle>
            </Chakra.Alert>}
        >
            <CollapseHeight>
                <Chakra.Wrap spacingX={{
                    lg: 2
                }}>
                    <Author_Artists />
                    <Genre />
                    <Theme />
                    <Format />
                    <Content />
                    <Demographics />
                    <Links />
                    <AltTitles />
                    <LatestChapter />
                </Chakra.Wrap>
            </CollapseHeight>
        </React.Suspense>
    );
}
