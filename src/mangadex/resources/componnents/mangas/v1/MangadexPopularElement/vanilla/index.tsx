import { Manga } from "@mangadex/api/structures/Manga";
import { PropsProvider } from "../../MangaElementDef/vanilla";
import Body from "./Body";
import CoverImage from "./CoverImage";
import Layout from "./layout";

export default function MangaPopularElement(props: {
    src: Manga
}) {
    return (
        <PropsProvider value={props}>
            <Layout>
                <CoverImage/>
                <Body/>
            </Layout>
        </PropsProvider>
    );
}