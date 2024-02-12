<script lang="ts">
	import sideDirGQLDoc from "@mangadex/gql-docs/sidebarSub";
	import { Direction } from "@mangadex/gql/graphql";
	import { sub_end } from "@mangadex/utils";
	import { Box } from "@svelteuidev/core";
	import { getContextClient, subscriptionStore } from "@urql/svelte";
	import { createEventDispatcher, onDestroy } from "svelte";
	import { ChevronLeftIcon, ChevronRightIcon } from "svelte-feather-icons";
	import { derived } from "svelte/store";
	import { v4 } from "uuid";
	export let isRight: boolean = false;
	export let size = "24";
	const sub_id = v4();
	const rtl_sub = subscriptionStore({
		client: getContextClient(),
		query: sideDirGQLDoc,
		variables: {
			sub_id
		}
	});
	onDestroy(() => {
		sub_end(sub_id);
	});
	const rtl = derived(rtl_sub, ($r) => $r.data?.watchSidebarDirection == Direction.Rtl);
    const dispatch = createEventDispatcher<{
        click: CustomEvent<HTMLDivElement>
    }>();
</script>

<Box on:click>
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
</Box>
