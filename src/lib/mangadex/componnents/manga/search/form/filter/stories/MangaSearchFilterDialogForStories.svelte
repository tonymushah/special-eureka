<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import { TagGroup } from "@mangadex/gql/graphql";
	import { random, range } from "lodash";
	import { writable } from "svelte/store";
	import { v4 } from "uuid";
	import { defaultMangaFilterParams, init } from "../contexts";
	import {
		initMangaSearchAuthorSearchFetcher,
		NaiveAuthorSearchFetcherResultData
	} from "../contexts/authorArtist";
	import { newTagOptionsValue } from "../contexts/tags";
	import MangaSearchFilterDialog from "../MangaSearchFilterDialog.svelte";

	const options = defaultMangaFilterParams();
	(() => {
		const tags = options.tags;
		tags.set(v4(), newTagOptionsValue("Romance", TagGroup.Genre));
		tags.set(v4(), newTagOptionsValue("Comedy", TagGroup.Theme));
		tags.set(v4(), newTagOptionsValue("4-Koma", TagGroup.Format));
	})();
	initMangaSearchAuthorSearchFetcher(async (name) => {
		//await delay(2000);
		console.log(name);
		return {
			data: range(0, random(10, false)).map((value) => ({
				value: `Author ${value}`,
				id: v4()
			})),
			hasNext() {
				return true;
			},
			async next() {
				return new NaiveAuthorSearchFetcherResultData(
					range(0, random(25, false)).map((value) => ({
						value: `Author ${value}`,
						id: v4()
					}))
				);
			}
		};
	});
	const { store } = init(writable(options));
	let dialog_bind: HTMLDialogElement | undefined = $state(undefined);
	interface Props {
		requireValidation?: boolean;
	}

	let { requireValidation = false }: Props = $props();
</script>

<ButtonAccentOnlyLabel
	label="Open dialog"
	onclick={() => {
		dialog_bind?.showModal();
	}}
/>

<MangaSearchFilterDialog
	bind:dialog_bind
	onvalidate={() => {
		dialog_bind?.close();
	}}
	{requireValidation}
/>
