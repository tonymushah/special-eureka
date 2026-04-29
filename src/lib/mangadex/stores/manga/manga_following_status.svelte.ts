import type { ReadonlyValue } from "$lib";
import { client } from "@mangadex/gql/urql";
import type { Getter } from "runed";
import {
	get_manga_following_status,
	type MangaFollowingStatusOption
} from "./manga_following_status";
import { subscription } from "./manga_following_status.query";

export default function manga_following_status(
	mangaId: Getter<string>,
	options: MangaFollowingStatusOption = {
		getOnMount: true
	}
): ReadonlyValue<boolean> {
	let val = $state<boolean>(options.initValue ?? false);
	let manga_id = $derived.by(mangaId);
	$effect.pre(() => {
		const sub = client
			.subscription(subscription, {
				id: manga_id
			})
			.subscribe((res) => {
				if (res.data) {
					val = res.data?.watchIsFollowingManga ?? false;
				} else if (res.error) {
					console.error(res.error);
				}
			});
		if (options?.getOnMount)
			get_manga_following_status(manga_id).catch(options.onGetError ?? console.error);
		return () => {
			sub.unsubscribe();
		};
	});
	return {
		get value() {
			return val;
		}
	};
}
