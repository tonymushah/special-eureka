import { Manga } from "@mangadex/api/structures/Manga";
import MangaContextMenu from "../../MangaContextMenu";
import { PropsProvider } from "../../MangaElementDef/vanilla";
import Image from "./Image";
import Title from "./Title";
import Layout from "./Layout";

export default function MangaVerticalElement(props: {
    src: Manga,
    isRefetching?: boolean,
    refetch?: () => void
}) {
    return (
        <MangaContextMenu
            mangaId={props.src.get_id()}
            refetch={props.refetch}
        >
            <PropsProvider value={{
                src: props.src
            }}>
                <Layout isRefetching={props.isRefetching}>
                    <Image />
                    <Title />
                </Layout>
            </PropsProvider>
        </MangaContextMenu>
    );
}
