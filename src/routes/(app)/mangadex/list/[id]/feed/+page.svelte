<script lang="ts">
	import { CustomListVisibility } from "@mangadex/gql/graphql";
	import type { PageData } from "./$types";
	import { readonly, writable } from "svelte/store";
	import SearchContent from "./SearchContent.svelte";

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	const isPrivate = writable(data.attributes.visibility == CustomListVisibility.Private);
	$effect(() => {
		isPrivate.set(data.attributes.visibility == CustomListVisibility.Private);
	});
	const customListId = writable<string>(data.id);
	$effect(() => {
		customListId.set(data.id);
	});
</script>

<SearchContent customListId={readonly(customListId)} isPrivate={readonly(isPrivate)} />
