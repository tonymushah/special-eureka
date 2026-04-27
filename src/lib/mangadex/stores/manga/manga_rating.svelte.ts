import type { ReadonlyValue } from "$lib";
import { client } from "@mangadex/gql/urql";
import type { Getter } from "runed";
import { get_manga_rating, type MangaRatingOption } from "./manga_rating";
import { subscription } from "./manga_rating.query";

export default function manga_rating(
	mangaId: Getter<string>,
	option: MangaRatingOption = {
		getOnMount: true
	}
): ReadonlyValue<number | null> {
	let val = $state<number | null>(option.initValue ?? null);
	let manga_id = $derived.by(mangaId);
	$effect.pre(() => {
		const sub = client
			.subscription(subscription, {
				id: manga_id
			})
			.subscribe((e) => {
				if (e.data) {
					val = e.data.watchRating.rating ?? null;
				} else if (e.error) {
					console.error(e.error);
				}
			});
		if (option.getOnMount)
			get_manga_rating(manga_id)
				.then((e) => (val = e))
				.catch(option.onGetError ?? console.error);
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
