import Manga from "@mangadex/api/structures/Manga";
import { PropsProvider } from "../../MangaElementDef/vanilla";
import Body from "./Body";
import CoverImage from "./CoverImage";
import Layout from "./layout";
import MangaContextMenu from "../../MangaContextMenu";

export default function MangaPopularElement(props: {
    src: Manga
}) {
    return (
        <PropsProvider value={props}>
            <MangaContextMenu mangaId={props.src.get_id()}>
                <Layout>
                    <CoverImage />
                    <Body />
                </Layout>
            </MangaContextMenu>
        </PropsProvider>
    );
}