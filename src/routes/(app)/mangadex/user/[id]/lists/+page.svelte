<script lang="ts">
	import type { PageData } from "./$types";
	import SearchContent from "./SearchContent.svelte";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<AppTitle title="{data.username} MDLists - MangaDex" />

<SearchContent userId={data.id} />
