<script lang="ts">
	import { derived as sderived } from "svelte/store";
	import SearchContent from "./SearchContent.svelte";
	import pageLimit from "@mangadex/stores/page-limit";

	let refetch: (() => void) | undefined = $state(undefined);
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<h1
	onclick={() => {
		refetch?.();
	}}
>
	Recently Added Titles
</h1>

<SearchContent
	bind:refetch
	params={sderived(pageLimit, (e) => ({
		limit: e
	}))}
/>
