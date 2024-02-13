<script lang="ts">
	import StatusBadge from "@mangadex/componnents/theme/tag/StatusBadge.svelte";
	import { MangaStatus } from "@mangadex/gql/graphql";
	import make_first_upper_case from "@mangadex/utils/make_first_upper_case";
	import get_manga_status_color from "@mangadex/utils/manga/status/get_color";
	import type { StatusColor } from "@mangadex/utils/types/status";
	import { onMount } from "svelte";
	export let status: MangaStatus;
	let color: StatusColor = "gray";
	export let showText = true;
	onMount(() => {
		color = get_manga_status_color(status);
	});
	$: _status = make_first_upper_case(status.toLowerCase());
</script>

<StatusBadge {color}>
	{#if showText}
		{_status}
	{/if}
</StatusBadge>
