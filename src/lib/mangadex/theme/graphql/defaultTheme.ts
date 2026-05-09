import { graphql, useFragment } from "@mangadex/gql/exports";
import { client } from "@mangadex/gql/urql";
import { debounce } from "lodash";
import { get, readable, type Updater, type Writable } from "svelte/store";
import { MangaDexThemeFrag } from ".";
import { custom, type MangadexTheme } from "..";
import { GqlThemeToITheme, IThemeToGqlThemeInput } from "../convert";

export const subscription = graphql(`
	subscription defaultThemeProfileSubscription {
		watchThemeProfileDefault {
			...MangaDexThemeFrag
		}
	}
`);

export const mutation = graphql(`
	mutation updateDefaultTheme($theme: MangaDexThemeInput!) {
		userOption {
			updateDefaultTheme(theme: $theme) {
				...MangaDexThemeFrag
			}
		}
	}
`);

const readSub = readable<MangadexTheme>(custom, (set) => {
	const unsub = client.subscription(subscription, {}).subscribe((res) => {
		const data = res.data;
		if (data) {
			set(GqlThemeToITheme(useFragment(MangaDexThemeFrag,data.watchThemeProfileDefault)));
		}
	});
	return () => {
		unsub.unsubscribe();
	};
});

const debounce_defaultTheme_set = debounce((value: MangadexTheme) => {
	if (value != custom) {
		// console.log("theme update")
		client
			.mutation(mutation, {
				theme: IThemeToGqlThemeInput(value)
			})
			.toPromise()
			.then(console.debug)
			.catch(console.error);
	}
}, 150);

const debounce_defaultTheme_update = debounce((updater: Updater<MangadexTheme>) => {
	const value = updater(get(readSub));
	if (value != custom) {
		client
			.mutation(mutation, {
				theme: IThemeToGqlThemeInput(value)
			})
			.toPromise()
			.then(console.debug)
			.catch(console.error);
	}
}, 150);

const defaultTheme: Writable<MangadexTheme> = {
	subscribe(run, invalidate) {
		return readSub.subscribe(run, invalidate);
	},
	set(value) {
		debounce_defaultTheme_set(value);
	},
	update(updater) {
		debounce_defaultTheme_update(updater);
	}
};

export default defaultTheme;