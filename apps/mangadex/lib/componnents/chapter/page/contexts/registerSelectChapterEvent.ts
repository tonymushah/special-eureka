import { goto } from "$app/navigation";
import { route } from "$lib/ROUTES";
import { addListenerToSelectChapterEventTarget } from "./previousNextEventTarget";

type UnlistenFn = () => void;

export default function registerSelectChapterEvent(): UnlistenFn {
	return addListenerToSelectChapterEventTarget(({ id }) => {
		goto(
			route("/mangadex/chapter/[id]", {
				id
			})
		);
	});
}
