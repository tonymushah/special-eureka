<script lang="ts">
	import is_tag_danger from "@mangadex/utils/tags/is_tag_danger";
	import { onMount } from "svelte";
	import StatusBadge from "../theme/tag/StatusBadge.svelte";
	import DangerBadge from "../theme/tag/DangerBadge.svelte";

	export let id: string;
	export let name: string;
	let isDanger = false;
	onMount(() => {
		isDanger = is_tag_danger(id);
	});
</script>

{#if isDanger}
	<DangerBadge>
		{name}
	</DangerBadge>
{:else}
	<StatusBadge color="gray">
		{name}
	</StatusBadge>
{/if}
