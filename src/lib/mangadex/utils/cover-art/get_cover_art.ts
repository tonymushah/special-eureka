import { internalToStore } from "$lib/index.svelte";
import { graphql } from "@mangadex/gql/exports";
import type { CoverImageQuality } from "@mangadex/gql/graphql";
import { mangadexQueryClient } from "@mangadex/index";
import { createQuery } from "@tanstack/svelte-query";
import { Client } from "@urql/svelte";
import { derived, type Readable } from "svelte/store";
import coverNotFound from "@mangadex/assets/artworks/cover-not-found.jpg";

const query = graphql(`
	query coverImage(
		$cover_id: UUID!
		$manga_id: UUID!
		$filename: String!
		$mode: CoverImageQuality
	) {
		cover {
			getImage(coverId: $cover_id, mangaId: $manga_id, filename: $filename, mode: $mode)
		}
	}
`);

export default function get_cover_art({
	cover_id,
	manga_id,
	filename,
	client,
	mode
}: {
	cover_id: string;
	manga_id: string;
	filename: string;
	client: Client;
	mode?: CoverImageQuality;
}): Readable<string | undefined> {
	const store = () => createQuery(() => ({
		queryKey: ["cover", "image", cover_id, manga_id, filename, mode],
		async queryFn() {
			const res = await client
				.query(query, {
					cover_id,
					manga_id,
					mode,
					filename
				})
				.toPromise();
			console.debug(["cover", "image", cover_id, manga_id, filename, mode]);
			if (res.error) {
				throw res.error;
			}
			if (res.data) {
				const url = res.data.cover.getImage;
				//return URL.createObjectURL(await (await fetch(url)).blob())
				return url;
			}
			throw new Error("No results??");
		},
		/*structuralSharing(oldData, newData) {
			try {
				if (typeof oldData == "string") {
					URL.revokeObjectURL(oldData);
				}
			} catch (e) {
				console.error(e);
			}
			return newData;
		},*/
		staleTime: 1000 * 60 * 15,
		networkMode: "always",
		retry: 1,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	}),
		() => mangadexQueryClient
	);
	return derived(internalToStore(store), ($s, set) => {
		if ($s.isSuccess) {
			const url: string = $s.data;
			set(url);
		} else if ($s.isError) {
			console.error($s.error);
			set(coverNotFound)
		}
	});
}
