<script lang="ts">
	import is_tag_danger from "@mangadex/utils/tags/is_tag_danger";
	import { onMount } from "svelte";
	import StatusBadge from "../theme/tag/StatusBadge.svelte";
	import DangerBadge from "../theme/tag/DangerBadge.svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLButtonAttributes, "children"> {
		id: string;
		name: string;
	}

	let { id, name, ...restProps }: Props = $props();
	let isDanger = $state(false);
	onMount(() => {
		isDanger = is_tag_danger(id);
	});
</script>

{#if isDanger}
	<DangerBadge {...restProps} variant="l1">
		{name}
	</DangerBadge>
{:else}
	<StatusBadge {...restProps} color="gray">
		{name}
	</StatusBadge>
{/if}
