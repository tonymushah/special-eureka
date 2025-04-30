<script lang="ts">
	import is_tag_danger from "@mangadex/utils/tags/is_tag_danger";
	import { onMount } from "svelte";
	import StatusBadge from "../theme/tag/StatusBadge.svelte";
	import DangerBadge from "../theme/tag/DangerBadge.svelte";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
			id: string;
		};
	}>();

	interface Props {
		id: string;
		name: string;
	}

	let { id, name }: Props = $props();
	let isDanger = $state(false);
	onMount(() => {
		isDanger = is_tag_danger(id);
	});
</script>

{#if isDanger}
	<DangerBadge
		onclick={({ detail }) => {
			dispatch("click", {
				...detail,
				id
			});
		}}
		variant="l1"
	>
		{name}
	</DangerBadge>
{:else}
	<StatusBadge
		onclick={({ detail }) => {
			dispatch("click", {
				...detail,
				id
			});
		}}
		color="gray"
	>
		{name}
	</StatusBadge>
{/if}
