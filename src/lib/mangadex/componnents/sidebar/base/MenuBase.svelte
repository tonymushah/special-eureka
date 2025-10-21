<script lang="ts">
	import sideDirGQLDoc from "@mangadex/gql-docs/sidebarSub";
	import { Direction } from "@mangadex/gql/graphql";
	import { getContextClient, subscriptionStore } from "@urql/svelte";
	import { isContextSidebarCollapsed } from "./CollapsedProvider.svelte";
	import { onMount } from "svelte";
	import { client } from "@mangadex/gql/urql";
	import sidebarDir from "@mangadex/gql-docs/sidebarDir";

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
	onMount(async () => {
		const res = await client.query(sidebarDir, {}).toPromise();
		rtl = res.data?.userOption.getSidebarDirection == Direction.Rtl;
	});
</script>

<div class="base" class:collapsed class:rtl>
	{@render children?.()}
</div>

<style lang="scss">
	div {
		animation-duration: var(--sidebar-transition-duration);
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
	}
	.base {
		padding-top: 8px;
		padding-bottom: 8px;
		display: flex;
		transition: background-color 300ms ease-in-out;
		flex-direction: row;
	}
	.base:not(.rtl) {
		animation-name: base-in;
	}
	.base.rtl {
		animation-name: base-in-rtl;
	}
	.base:hover {
		background-color: var(--accent-l1-hover);
	}
	.base.collapsed {
		animation-name: base-out;
	}
	@keyframes base-out {
		to {
			padding-left: 0px;
			padding-right: 0px;
			align-items: center;
			justify-content: center;
		}
	}
	@keyframes base-in-rtl {
		to {
			padding-right: 25px;
			align-items: initial;
			justify-content: initial;
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
