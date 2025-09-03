<script lang="ts">
	import { readonly, writable } from "svelte/store";
	import type { PageData } from "./$types";
	import SearchContent from "./SearchContent.svelte";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const idWritable = writable(data.id);
	$effect(() => {
		idWritable.set(data.id);
	});
	const id = readonly(idWritable);
</script>

<AppTitle title="{data.username} MDLists - MangaDex" />

<SearchContent userId={id} />
