import { route } from "$lib/ROUTES";

export default function openTitle(id: string) {
    route("/mangadex/title/[id]", {
        id
    });
}