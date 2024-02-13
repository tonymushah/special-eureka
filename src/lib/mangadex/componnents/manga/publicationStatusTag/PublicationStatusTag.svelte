<script lang="ts">
	import StatusBadge from "@mangadex/componnents/theme/tag/StatusBadge.svelte";
	import { MangaStatus } from "@mangadex/gql/graphql";
	import make_first_upper_case from "@mangadex/utils/make_first_upper_case";
	import type { StatusColor } from "@mangadex/utils/types/status";
	import { onMount } from "svelte";
	export let status: MangaStatus;
	let color: StatusColor = "gray";
	export let showText = true;
	onMount(() => {
		switch (status) {
			case MangaStatus.Cancelled:
				color = "red";
				break;
			case MangaStatus.Completed:
				color = "blue";
				break;
			case MangaStatus.Hiatus:
				color = "purple";
				break;
			case MangaStatus.Ongoing:
				color = "green";
			default:
				break;
		}
	});
	$: _status = make_first_upper_case(status.toLowerCase());
</script>

<StatusBadge {color}>
	{#if showText}
		{_status}
	{/if}
</StatusBadge>
