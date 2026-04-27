<script lang="ts">
	import { readonly, writable } from "svelte/store";
	import type { PageData } from "./$types";
	import SearchContent from "./SearchContent.svelte";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<AppTitle title="{data.username} uploads - MangaDex" />

<SearchContent userId={data.id} />
