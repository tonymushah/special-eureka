<script lang="ts">
	import { CustomListVisibility } from "@mangadex/gql/graphql";
	import type { PageData } from "./$types";
	import { readonly, writable } from "svelte/store";
	import SearchContent from "./SearchContent.svelte";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	// svelte-ignore state_referenced_locally
	const isPrivate = writable(data.attributes.visibility == CustomListVisibility.Private);
	$effect(() => {
		isPrivate.set(data.attributes.visibility == CustomListVisibility.Private);
	});
	// svelte-ignore state_referenced_locally
	const customListId = writable<string>(data.id);
	$effect(() => {
		customListId.set(data.id);
	});
</script>

<AppTitle title="{data.attributes.name} feed - MangaDex" />

<SearchContent customListId={readonly(customListId)} isPrivate={readonly(isPrivate)} />
