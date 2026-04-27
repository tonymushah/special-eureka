import { client } from "@mangadex/gql/urql";
import { readable, type Readable } from "svelte/store";
import {
	followMutation,
	query,
	subscription,
	unfollowMutation
} from "./manga_following_status.query";

export async function get_manga_following_status(manga_id: string): Promise<boolean> {
	const res = await client
		.query(query, {
			id: manga_id
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	} else if (res.data) {
		return res.data.follows.isFollowingManga;
	} else {
		throw new Error("no data??");
	}
}

export async function followManga(manga_id: string) {
	const res = await client
		.mutation(followMutation, {
			id: manga_id
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	}
}

export async function unfollowManga(manga_id: string) {
	const res = await client
		.mutation(unfollowMutation, {
			id: manga_id
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	}
}

export async function set_manga_following_status(manga_id: string, is_following: boolean) {
	if (is_following) {
		await followManga(manga_id);
	} else {
		await unfollowManga(manga_id);
	}
}

export type MangaFollowingStatusOption = {
	getOnMount?: boolean;
	onGetError?: (e: unknown) => void;
	initValue?: boolean;
};

export default function manga_following_status(
	manga_id: string,
	options: MangaFollowingStatusOption = {
		getOnMount: true
	}
): Readable<boolean> {
	return readable(options.initValue ?? false, (set) => {
		const sub = client
			.subscription(subscription, {
				id: manga_id
			})
			.subscribe((res) => {
				if (res.data) {
					set(res.data?.watchIsFollowingManga ?? false);
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
}
