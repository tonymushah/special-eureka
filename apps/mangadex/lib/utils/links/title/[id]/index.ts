import { goto } from "$app/navigation";
import { route } from "$lib/ROUTES";

export default function openTitle(id: string) {
    goto(route("/mangadex/title/[id]", {
        id
    }));
}