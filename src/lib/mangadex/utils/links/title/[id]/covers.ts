import { goto } from "$app/navigation";
import { route } from "$lib/ROUTES";

export default function openTitleCovers(id: string) {
	goto(
		route("/mangadex/title/[id]/covers", {
			id
		})
	);
}
