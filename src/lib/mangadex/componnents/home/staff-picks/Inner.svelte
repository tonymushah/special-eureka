<script lang="ts">
	import type { Readable } from "svelte/store";
	import type { StaffPicksTitle } from ".";
	import type { CombinedError } from "@urql/svelte";
	import TopTitle from "../utils/TopTitle.svelte";
	import Content from "./Content.svelte";
	import HomeErrorComponnent from "../utils/HomeErrorComponnent.svelte";
	import PopularTitleSpinner from "../utils/PopularTitleSpinner.svelte";

	interface Props {
		isFetching: Readable<boolean>;
		data_store: Readable<
			| {
					id: string;
					mangas: StaffPicksTitle[];
			  }
			| undefined
		>;
		execute: () => Promise<void> | undefined;
		error: Readable<CombinedError | undefined>;
	}
	let { isFetching, data_store, execute, error }: Props = $props();
</script>

<TopTitle
	label="Staff Picks"
	fetching={$isFetching}
	onrefresh={async () => {
		if (!$isFetching) {
			await execute();
		}
	}}
/>

{#if $data_store != undefined}
	<Content mangas={$data_store.mangas} />
{:else if $error != undefined}
	<HomeErrorComponnent
		error={$error}
		label="Oops! Something happens when loading the staff picks"
	/>
{:else}
	<PopularTitleSpinner --height="20em" />
{/if}
