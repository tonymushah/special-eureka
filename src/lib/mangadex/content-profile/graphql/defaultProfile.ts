import type { ContentProfile } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { get, readable, type Writable } from "svelte/store";

import { mutation, subscription } from "./defaultProfile/query";

const sub_read = readable<ContentProfile>(
	{
		contentRating: [],
		excludedGroups: [],
		excludedOriginalLanguage: [],
		excludedTags: [],
		excludedUploaders: [],
		includedTags: [],
		originalLanguages: [],
		status: [],
		translatedLanguages: [],
		publicationDemographic: []
	},
	(set) => {
		const sub = client.subscription(subscription, {}).subscribe((res) => {
			const data = res.data;
			if (data) {
				set(data.watchContentProfileDefault);
			}
		});
		return () => {
			sub.unsubscribe();
		};
	}
);

const defaultContentProfile: Writable<ContentProfile> = {
	subscribe: sub_read.subscribe,
	set(value) {
		client
			.mutation(mutation, {
				entry: value
			})
			.toPromise()
			.then(console.log)
			.catch(console.error);
	},
	update(updater) {
		client
			.mutation(mutation, {
				entry: updater(get(sub_read))
			})
			.toPromise()
			.then(console.log)
			.catch(console.error);
	}
};

export default defaultContentProfile;
