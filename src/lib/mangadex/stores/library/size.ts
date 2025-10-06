import librarySizeQuery from "@mangadex/gql-docs/library/sizes";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createQuery } from "@tanstack/svelte-query";

export default function getCurrentUserLibrarySize() {
	return createQuery(() => (
		{
			queryKey: ["current", "user", "library", "size"],
			async queryFn() {
				const res = await client.query(librarySizeQuery, {}).toPromise();
				if (res.data) {
					return res.data.library.size;
				} else if (res.error) {
					throw res.error;
				} else {
					throw new Error("no results??");
				}
			}
		}),
		() => mangadexQueryClient
	);
}
