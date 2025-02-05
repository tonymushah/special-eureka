<script lang="ts">
	import sideDirGQLDoc from "@mangadex/gql-docs/sidebarSub";
	import { Direction } from "@mangadex/gql/graphql";
	import { getContextClient, subscriptionStore } from "@urql/svelte";
	import type { Snippet } from "svelte";

	interface Props {
		_icon?: Snippet;
		_suffixIcon?: Snippet;
		children?: Snippet;
	}
	const rlt_sub = subscriptionStore({
		client: getContextClient(),
		query: sideDirGQLDoc,
		variables: {}
	});
	let { _icon, _suffixIcon, children }: Props = $props();
	let rtl = $derived($rlt_sub.data?.watchSidebarDirection == Direction.Rtl);
	$effect(() => {
		console.log(rtl);
	});
</script>

{#if !rtl}
	<div class="icon">
		{@render _icon?.()}
	</div>
{:else}
	<div class="suffix-icon">
		{@render _suffixIcon?.()}
	</div>
{/if}

{#if children}
	{@render children()}
{/if}

{#if rtl}
	<div class="icon">
		{@render _icon?.()}
	</div>
{:else}
	<div class="suffix-icon">
		{@render _suffixIcon?.()}
	</div>
{/if}
