<script lang="ts">
	import sideDirGQLDoc from "@mangadex/gql-docs/sidebarSub";
	import { Direction } from "@mangadex/gql/graphql";
	import { sub_end } from "@mangadex/utils";
	import { getContextClient, subscriptionStore } from "@urql/svelte";
	import { onDestroy } from "svelte";
	import { slide } from "svelte/transition";
	import { v4 } from "uuid";
	const sub_id = v4();
	const rlt_sub = subscriptionStore({
		client: getContextClient(),
		query: sideDirGQLDoc,
		variables: {
			sub_id
		}
	});
	onDestroy(() => {
		sub_end(sub_id);
	});
	$: rtl = $rlt_sub.data?.watchSidebarDirection == Direction.Rtl;
	export let collapsed: boolean = false;
	export let label: string;
</script>

{#if !collapsed}
	<div
		class:label={true}
		class:rtl
		transition:slide={{
			axis: "x"
		}}
	>
		<h4>{label}</h4>
	</div>
{/if}

<style lang="scss">
	h4 {
		color: currentColor;
		font-family: Poppins;
		margin: 0px;
		margin-left: 10px;
	}
	div {
		display: -webkit-box;
		overflow: hidden;
		text-wrap: nowrap;
		text-overflow: ellipsis;
		animation-duration: 300ms;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
	}
	.label.rtl {
		text-align: end;
	}
	.label {
		width: 100%;
		transition: text-align 300ms ease-in-out;
	}
</style>
