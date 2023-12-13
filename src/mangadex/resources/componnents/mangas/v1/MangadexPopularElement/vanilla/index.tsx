import Manga from "@mangadex/api/structures/Manga";
import { PropsProvider } from "../../MangaElementDef/vanilla/Props";
import Layout from "./layout";
import MangaContextMenu from "../../MangaContextMenu";
import React from "react";
import CoverImageFallBack from "../../MangaPopularElementFallback/Image";
import BodyFallback from "../../MangaPopularElementFallback/Body";

const CoverImage = React.lazy(() => import("./CoverImage"));

const Body = React.lazy(() => import("./Body"));

export default function MangaPopularElement(props: {
    src: Manga
}) {
    return (
        <PropsProvider value={props}>
            <MangaContextMenu mangaId={props.src.get_id()}>
                <Layout>
                    <React.Suspense fallback={<CoverImageFallBack />}>
                        <CoverImage />
                    </React.Suspense>
                    <React.Suspense fallback={<BodyFallback />}>
                        <Body />
                    </React.Suspense>
                </Layout>
            </MangaContextMenu>
        </PropsProvider>
    );
}