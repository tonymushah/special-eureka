<script lang="ts">
	import sideDirGQLDoc from "@mangadex/gql-docs/sidebarSub";
	import { Direction } from "@mangadex/gql/graphql";
	import { getContextClient, subscriptionStore } from "@urql/svelte";
	import type { Snippet } from "svelte";

	interface Props {
		icon?: Snippet;
		suffixIcon?: Snippet;
		children?: Snippet;
	}
	const rlt_sub = subscriptionStore({
		client: getContextClient(),
		query: sideDirGQLDoc,
		variables: {}
	});
	let { icon, suffixIcon, children }: Props = $props();
	let rtl = $derived($rlt_sub.data?.watchSidebarDirection == Direction.Rtl);
</script>

{#if !rtl}
	<div class="icon">
		{@render icon?.()}
	</div>
{:else}
	<div class="suffix-icon">
		{@render suffixIcon?.()}
	</div>
{/if}

{@render children?.()}

{#if rtl}
	<div class="suffix-icon">
		{@render suffixIcon?.()}
	</div>
{:else}
	<div class="icon">
		{@render icon?.()}
	</div>
{/if}
