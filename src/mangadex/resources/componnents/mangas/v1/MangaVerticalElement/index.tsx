import { Manga } from "@mangadex/api/structures/Manga";
import Vanilla from "./vanilla";

export default function MangaVerticalElement(props: {
    src: Manga,
    isRefetching?: boolean,
    refetch?: () => void
}) {
    return (
        <Vanilla {...props}/>
    );
}