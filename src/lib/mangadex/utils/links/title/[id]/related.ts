import { goto } from "$app/navigation";
import { route } from "$lib/ROUTES";

export default function openTitleRelated(id: string) {
    goto(route("/mangadex/title/[id]/related", {
        id
    }));
}