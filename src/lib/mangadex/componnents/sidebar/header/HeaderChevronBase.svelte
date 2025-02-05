<script lang="ts">
	import sideDirGQLDoc from "@mangadex/gql-docs/sidebarSub";
	import { Direction } from "@mangadex/gql/graphql";
	import { getContextClient, subscriptionStore } from "@urql/svelte";
	import { createEventDispatcher } from "svelte";
	import { ChevronLeftIcon, ChevronRightIcon } from "svelte-feather-icons";
	import { derived } from "svelte/store";
	interface Props {
		isRight?: boolean;
		size?: string;
	}

	let { isRight = false, size = "24" }: Props = $props();
	const rtl_sub = subscriptionStore({
		client: getContextClient(),
		query: sideDirGQLDoc
	});
	const rtl = derived(rtl_sub, ($r) => $r.data?.watchSidebarDirection == Direction.Rtl);
	const dispatch = createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		};
		keydown: KeyboardEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		};
	}>();
</script>

<div
	tabindex="0"
	role="button"
	onkeydown={(e) => {
		dispatch("keydown", e);
	}}
	onclick={(e) => {
		dispatch("click", e);
	}}
>
	{#if isRight}
		{#if $rtl}
			<ChevronRightIcon {size} />
		{:else}
			<ChevronLeftIcon {size} />
		{/if}
	{:else if $rtl}
		<ChevronLeftIcon {size} />
	{:else}
		<ChevronRightIcon {size} />
	{/if}
</div>

<style lang="scss">
	div {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
