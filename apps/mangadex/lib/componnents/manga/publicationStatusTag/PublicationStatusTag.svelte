<script lang="ts">
	import StatusBadge from "@mangadex/componnents/theme/tag/StatusBadge.svelte";
	import { MangaStatus } from "@mangadex/gql/graphql";
	import make_first_upper_case from "@mangadex/utils/make_first_upper_case";
	import get_manga_status_color from "@mangadex/utils/manga/status/get_color";
	import type { StatusColor } from "@mangadex/utils/types/status";
	import { onMount } from "svelte";
	let color: StatusColor = $state("gray");
	interface Props {
		status: MangaStatus;
		showText?: boolean;
	}

	let { status, showText = true }: Props = $props();
	onMount(() => {
		color = get_manga_status_color(status);
	});
	let _status = $derived(make_first_upper_case(status.toLowerCase()));
</script>

<StatusBadge {color}>
	{#if showText}
		{_status}
	{/if}
</StatusBadge>
