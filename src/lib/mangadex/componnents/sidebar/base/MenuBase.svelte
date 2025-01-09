<script lang="ts">
	import sideDirGQLDoc from "@mangadex/gql-docs/sidebarSub";
	import { Direction } from "@mangadex/gql/graphql";
	import { getContextClient, subscriptionStore } from "@urql/svelte";
	import { isContextSidebarCollapsed } from "./CollapsedProvider.svelte";
	const rlt_sub = subscriptionStore({
		client: getContextClient(),
		query: sideDirGQLDoc,
		variables: {}
	});
	interface Props {
		collapsed?: boolean;
		children?: import("svelte").Snippet;
	}

	let { collapsed = isContextSidebarCollapsed(), children }: Props = $props();
	let rtl = $derived($rlt_sub.data?.watchSidebarDirection == Direction.Rtl);
</script>

<div class:base={true} class:collapsed class:rtl>
	{@render children?.()}
</div>

<style lang="scss">
	div {
		animation-duration: 300ms;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
	}
	.base {
		padding-top: 8px;
		padding-bottom: 8px;
		display: flex;
		animation-name: base-in;
		transition: background-color 300ms ease-in-out;
		flex-direction: row;
	}
	.base:hover {
		background-color: var(--accent-l1-hover);
	}
	.base.collapsed {
		animation-name: base-out;
	}
	.base.rtl {
		flex-direction: row-reverse;
	}
	@keyframes base-out {
		to {
			padding-left: 0px;
			align-items: center;
			justify-content: center;
		}
	}
	@keyframes base-in {
		to {
			padding-left: 25px;
			align-items: initial;
			justify-content: initial;
		}
	}
</style>
