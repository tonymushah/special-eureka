import { graphql, useFragment } from "@mangadex/gql/exports";
import { client } from "@mangadex/gql/urql";
import { derived, get, readable, type Writable } from "svelte/store";
import { MangaDexThemeFrag } from ".";
import { type MangadexTheme as IMangadexTheme } from "../";
import { GqlThemeToITheme, IThemeToGqlThemeInput } from "../convert";

export const subscription = graphql(`
	subscription themeProfilesSubscription {
		watchThemesProfile {
			name
			value {
				...MangaDexThemeFrag
			}
		}
	}
`);

export const mutation = graphql(`
	mutation updateThemeProfiles($themes: [ThemeProfileEntryInput!]!) {
		userOption {
			setThemeProfiles(entries: $themes)
		}
	}
`);

export const singleUpdateMutation = graphql(`
	mutation updateThemeProfile($name: String!, $theme: MangaDexThemeInput) {
		userOption {
			setThemeProfile(name: $name, theme: $theme) {
				...MangaDexThemeFrag
			}
		}
	}
`);

const sub_read = readable(new Map<string, IMangadexTheme>(), (set) => {
	const sub = client.subscription(subscription, {}).subscribe((res) => {
		const data = res.data;
		if (data) {
			set(
				new Map(
					data.watchThemesProfile
						.sort((a, b) => {
							return a.name.localeCompare(b.name);
						})
						.map((entry) => [entry.name, GqlThemeToITheme(useFragment(MangaDexThemeFrag,entry.value))])
				)
			);
		}
	});
	return () => {
		sub.unsubscribe();
	};
});

const themes: Writable<Map<string, IMangadexTheme>> = {
	subscribe: sub_read.subscribe,
	set(value) {
		client
			.mutation(mutation, {
				themes: Array.from(value.entries()).map(([name, value]) => ({
					value: IThemeToGqlThemeInput(value),
					name
				}))
			})
			.toPromise()
			.then(console.debug)
			.catch(console.error);
	},
	update(updater) {
		client
			.mutation(mutation, {
				themes: Array.from(updater(get(sub_read)).entries()).map(([name, value]) => ({
					value: IThemeToGqlThemeInput(value),
					name
				}))
			})
			.toPromise()
			.then(console.debug)
			.catch(console.error);
	}
};

export default themes;

export function theme(name: string): Writable<IMangadexTheme | undefined> {
	const sub_read_derived = derived(sub_read, ($sub) => $sub.get(name));
	return {
		subscribe: sub_read_derived.subscribe,
		set(value) {
			client
				.mutation(singleUpdateMutation, {
					name,
					theme: value ? IThemeToGqlThemeInput(value) : undefined
				})
				.toPromise()
				.then(console.debug)
				.catch(console.error);
		},
		update(updater) {
			const value = updater(get(sub_read_derived));
			client
				.mutation(singleUpdateMutation, {
					name,
					theme: value ? IThemeToGqlThemeInput(value) : undefined
				})
				.toPromise()
				.then(console.debug)
				.catch(console.error);
		}
	};
}