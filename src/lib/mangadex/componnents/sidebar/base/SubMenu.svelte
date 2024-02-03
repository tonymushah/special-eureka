<script lang="ts">
	import sideDirGQLDoc from "@mangadex/gql-docs/sidebarSub";
	import { Direction } from "@mangadex/gql/graphql";
	import { sidebarState as isOpen } from "@mangadex/stores";
	import { Box, Text } from "@svelteuidev/core";
	import { getContextClient, subscriptionStore } from "@urql/svelte";
	import { createEventDispatcher } from "svelte";
	import { v4 } from "uuid";
	import HeaderChevronBase from "../header/HeaderChevronBase.svelte";
	export let label: string;
	$: collapsed = $isOpen;
	const sub_id = v4();
	const rlt_sub = subscriptionStore({
		client: getContextClient(),
		query: sideDirGQLDoc,
		variables: {
			sub_id
		}
	});
	let isMenuOpen = false;
    $: () => {
        if(collapsed){
            isMenuOpen = false
        }
    }
	$: rtl = $rlt_sub.data?.watchSidebarDirection == Direction.Rtl;
</script>

<div>
	<Box
		on:click={() => {
			if (!collapsed) isMenuOpen = !isMenuOpen;
		}}
	>
		<div class:base={true} class:collapsed>
			{#if rtl && collapsed}
				<HeaderChevronBase />
			{/if}
			{#if !rtl}
				<div class="icon">
					<slot name="icon" />
				</div>
			{/if}

			<div class:label={true} class:rtl class:collapsed>
				<h4>{label}</h4>
			</div>

			{#if rtl}
				<div class="icon">
					<slot name="icon" />
				</div>
			{/if}

			{#if !rtl && collapsed}
				<HeaderChevronBase />
			{/if}
		</div>
	</Box>

	<div class:body={true} class:visible={isOpen && !collapsed}>
		<slot />
	</div>
</div>

<style lang="scss">
	h4 {
		font-family: Poppins;
		margin: 0px;
		margin-left: 10px;
		line-clamp: 1;
	}
	div {
		animation-duration: 300ms;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
	}
	.base {
		display: flex;
		animation-name: base-in;
	}
	.base.collapsed {
		animation-name: base-out;
	}
	@keyframes base-out {
		to {
			margin-left: 0px;
			align-items: center;
			justify-content: center;
		}
	}
	@keyframes base-in {
		to {
			margin-left: 25px;
			align-items: initial;
			justify-content: initial;
		}
	}
	.label.rtl {
		text-align: end;
	}
	@keyframes label-in {
		from {
			display: initial;
			opacity: 0;
			width: 0px;
		}
		to {
			width: initial;
			opacity: 1;
		}
	}
	@keyframes label-out {
		from {
			width: initial;
			opacity: 1;
		}
		to {
			display: none;
			width: 0px;
			opacity: 0;
		}
	}
	.label {
		width: 100%;
		transition: text-align 300ms ease-in-out;
		animation-name: label-in;
	}
	.label.collapsed {
		animation-name: label-out;
	}
    .body {
        animation: body-out;
	}
	.body.visible {
        animation: body-in;
	}
	@keyframes body-in {
		to {
			display: flex;
			flex-direction: column;
			height: initial;
		}
	}
	@keyframes body-out {
		to {
			display: none;
			height: 0px;
		}
	}
</style>
