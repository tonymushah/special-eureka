<script lang="ts">
	import type { MangaStatus } from "@mangadex/gql/graphql";
	import getText from "@mangadex/utils/manga/status/getText";
	import get_manga_status_color from "@mangadex/utils/manga/status/get_color";
	interface Props {
		status: MangaStatus;
		year?: number | undefined;
	}

	let { status, year = undefined }: Props = $props();

	let color = $derived(get_manga_status_color(status));
	let text = $derived(getText(status));
</script>

<div class="manga-status">
	<span class="dot" style="background-color: var(--status-{color});"></span>
	<span>Publication:&nbsp;</span>
	{#if year != undefined}
		<span>{year},&nbsp;</span>
	{/if}
	<span>{text}</span>
</div>

<style lang="scss">
	.manga-status {
		display: flex;
		flex-direction: row;
		gap: 0px;
		align-items: center;
		font-weight: 800;
		.dot {
			margin-right: 5px;
			width: 12px;
			height: 12px;
			border-radius: 6px;
		}
	}
</style>
