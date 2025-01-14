import { graphql } from "@mangadex/gql";
import type { ContentProfile } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { derived, get, readable, type Writable } from "svelte/store";

export const subscription = graphql(`
	subscription watchContentProfiles {
		watchContentProfiles {
			name
			value {
				originalLanguages
				publicationDemographic
				includedTags
				includedTagsMode
				excludedTags
				excludedTagsMode
				status
				excludedOriginalLanguage
				translatedLanguages
				contentRating
				excludedGroups
				excludedUploaders
			}
		}
	}
`);

export const mutation = graphql(`
	mutation updateContentProfiles($entries: [ContentProfileEntryInput!]!) {
		userOption {
			setContentProfiles(entries: $entries)
		}
	}
`);

export const singleUpdateMutation = graphql(`
	mutation updateContentProfile($name: String!, $entry: ContentProfileInput) {
		userOption {
			setContentProfile(name: $name, profile: $entry) {
				originalLanguages
				publicationDemographic
				includedTags
				includedTagsMode
				excludedTags
				excludedTagsMode
				status
				excludedOriginalLanguage
				translatedLanguages
				contentRating
				excludedGroups
				excludedUploaders
			}
		}
	}
`);

const sub_read = readable(new Map<string, ContentProfile>(), (set) => {
	const sub = client.subscription(subscription, {}).subscribe((res) => {
		const data = res.data;
		if (data != undefined) {
			set(
				new Map(
					data.watchContentProfiles
						.sort((a, b) => {
							return a.name.localeCompare(b.name);
						})
						.map((entry) => [entry.name, entry.value])
				)
			);
		}
	});
	return () => {
		sub.unsubscribe();
	};
});

const contentProfiles: Writable<Map<string, ContentProfile>> = {
	subscribe: sub_read.subscribe,
	set(value) {
		client
			.mutation(mutation, {
				entries: Array.from(
					value.entries().map(([name, value]) => ({
						name,
						value
					}))
				)
			})
			.toPromise()
			.then(console.debug)
			.catch(console.error);
	},
	update(updater) {
		client
			.mutation(mutation, {
				entries: Array.from(
					updater(get(sub_read))
						.entries()
						.map(([name, value]) => ({
							name,
							value
						}))
				)
			})
			.toPromise()
			.then(console.debug)
			.catch(console.error);
	}
};

export default contentProfiles;

export function contentProfile(name: string): Writable<ContentProfile | undefined> {
	const sub_read_derived = derived(sub_read, ($sub) => $sub.get(name));
	return {
		subscribe: sub_read_derived.subscribe,
		set(value) {
			client
				.mutation(singleUpdateMutation, {
					name,
					entry: value
				})
				.toPromise()
				.then(console.log)
				.catch(console.error);
		},
		update(updater) {
			client
				.mutation(singleUpdateMutation, {
					name,
					entry: updater(get(sub_read_derived))
				})
				.toPromise()
				.then(console.log)
				.catch(console.error);
		}
	};
}
