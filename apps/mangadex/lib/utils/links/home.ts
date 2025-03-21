import { goto } from "$app/navigation";
import { route } from "$lib/ROUTES";

export default function home() {
    goto(route("/mangadex"));
}