<script lang="ts">
	import StatusBadge from "@mangadex/componnents/theme/tag/StatusBadge.svelte";
	import { MangaStatus } from "@mangadex/gql/graphql";
	import make_first_upper_case from "@mangadex/utils/make_first_upper_case";
	import get_manga_status_color from "@mangadex/utils/manga/status/get_color";
	import type { StatusColor } from "@mangadex/utils/types/status";

	interface Props {
		status: MangaStatus;
		showText?: boolean;
		disabled?: boolean;
	}

	let { status, showText = true, disabled }: Props = $props();
	let color: StatusColor = $derived.by(() => get_manga_status_color(status));

	let _status = $derived(make_first_upper_case(status.toLowerCase()));
</script>

<StatusBadge {color} {disabled}>
	{#if showText}
		{_status}
	{/if}
</StatusBadge>
