<script lang="ts">
	import sideDirGQLDoc from "@mangadex/gql-docs/sidebarSub";
	import { Direction } from "@mangadex/gql/graphql";
	import { getContextClient, subscriptionStore } from "@urql/svelte";
	import { ChevronLeftIcon, ChevronRightIcon } from "svelte-feather-icons";
	import { derived } from "svelte/store";

	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLDivElement;
			}
		) => any;
		onkeydown?: (
			ev: KeyboardEvent & {
				currentTarget: EventTarget & HTMLDivElement;
			}
		) => any;
	}
	interface Props extends Events {
		isRight?: boolean;
		size?: string;
	}

	let { isRight = false, size = "24", onclick, onkeydown }: Props = $props();
	const rtl_sub = subscriptionStore({
		client: getContextClient(),
		query: sideDirGQLDoc
	});
	const rtl = derived(rtl_sub, ($r) => $r.data?.watchSidebarDirection == Direction.Rtl);
</script>

<div
	tabindex="0"
	role="button"
	onkeydown={(e) => {
		onkeydown?.(e);
	}}
	onclick={(e) => {
		onclick?.(e);
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
