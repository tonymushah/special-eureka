import Manga from "@mangadex/api/structures/Manga";
import MangaContextMenu from "../../MangaContextMenu";
import { PropsProvider } from "../../MangaElementDef/vanilla/Props";
import Cover from "./Cover";
import Layout from "./Layout";
import Body from "./Body";

export default function MangaElementDef2(props: {
    src: Manga,
    isRefetching?: boolean,
    refetch?: () => void
}) {
    return (
        <MangaContextMenu
            mangaId={props.src.get_id()}
            refetch={props.refetch}
        >
            <PropsProvider
                value={{
                    src: props.src
                }}
            >
                <Layout>
                    <Cover />
                    <Body />
                </Layout>
            </PropsProvider>
        </MangaContextMenu>
    );
}
