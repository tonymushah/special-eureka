<script lang="ts">
	import { readonly, writable } from "svelte/store";
	import type { PageData } from "./$types";
	import SearchContent from "./SearchContent.svelte";
	export let data: PageData;
	const idWritable = writable(data.id);
	$: idWritable.set(data.id);
	const id = readonly(idWritable);
</script>

<SearchContent userId={id} />
