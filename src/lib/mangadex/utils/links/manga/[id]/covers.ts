import { route } from "$lib/ROUTES";

export default function openTitleCovers(id: string) {
    route("/mangadex/title/[id]/covers", {
        id
    });
}