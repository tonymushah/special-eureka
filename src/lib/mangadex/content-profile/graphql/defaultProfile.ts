import { client } from "@mangadex/gql/urql";
import { get, readable, type Writable } from "svelte/store";

import { useFragment } from "@mangadex/gql";
import { ContentProfileItemFragment, type ContentProfileItemFragmentType } from ".";
import { mutation, subscription } from "./defaultProfile/query";

const sub_read = readable<ContentProfileItemFragmentType>(
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
		publicationDemographic: [],
		excludedTagsMode: null,
		includedTagsMode: null
	},
	(set) => {
		const sub = client.subscription(subscription, {}).subscribe((res) => {
			const data = res.data;
			if (data) {
				set(useFragment(ContentProfileItemFragment,data.watchContentProfileDefault));
			}
		});
		return () => {
			sub.unsubscribe();
		};
	}
);

const defaultContentProfile: Writable<ContentProfileItemFragmentType> = {
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