import type { ReadonlyValue } from "$lib";
import type { ReadingStatus } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import type { Getter } from "runed";
import { get_manga_reading_status, type MangaReadingStatusOption } from "./manga_reading_status";
import { subscription } from "./manga_reading_status.query";

export default function manga_reading_status(
	_id: Getter<string>,
	options: MangaReadingStatusOption = {
		getOnMount: true
	}
): ReadonlyValue<ReadingStatus | null> {
	let val = $state<ReadingStatus | null>(null);
	let id = $derived.by(_id);
	$effect.pre(() => {
		const sub = client
			.subscription(subscription, {
				id
			})
			.subscribe((res) => {
				if (res.error) {
					console.warn(res.error);
					return;
				}
				const status = res.data?.watchMangaReadingState;
				val = status ?? null;
			});
		if (options.getOnMount) get_manga_reading_status(id).catch(options.onGetError ?? console.error);
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
