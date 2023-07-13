import Vanilla from "./vanilla";
import ErrorBoundary from "./error";
import { Manga } from "@mangadex/api/structures/Manga";

export default function MangaPopularElement(props: {
    src: Manga
}){
    return (
        <ErrorBoundary>
            <Vanilla {...props}/>
        </ErrorBoundary>
    );
}