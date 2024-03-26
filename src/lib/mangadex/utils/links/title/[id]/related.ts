import { route } from "$lib/ROUTES";

export default function openTitleRelated(id: string) {
    route("/mangadex/title/[id]/related", {
        id
    });
}