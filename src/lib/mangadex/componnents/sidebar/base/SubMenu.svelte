<script lang="ts">
	import sideDirGQLDoc from "@mangadex/gql-docs/sidebarSub";
	import { Direction } from "@mangadex/gql/graphql";
	import { sidebarState as isOpen } from "@mangadex/stores";
	import { Box, Text } from "@svelteuidev/core";
	import { getContextClient, subscriptionStore } from "@urql/svelte";
	import { v4 } from "uuid";
	import HeaderChevronBase from "../header/HeaderChevronBase.svelte";
	import MenuBase from "./MenuBase.svelte";
	import MenuLabel from "./MenuLabel.svelte";
	import { onDestroy } from "svelte";
	import { sub_end } from "@mangadex/utils";
	import MenuIcons from "./MenuIcons.svelte";
	import { ChevronDownIcon, ChevronUpIcon } from "svelte-feather-icons";
	export let label: string;
	$: collapsed = $isOpen;
	let isMenuOpen = false;
</script>

<div class="outer">
	<Box
		on:click={() => {
			isMenuOpen = !isMenuOpen;
		}}
	>
        

        
		<MenuBase bind:collapsed>
			<MenuIcons>
                <div slot="icon" class="icon" class:collapsed>
                    <slot name="icon"/>
                </div>
                    <div slot="suffix-icon" class="suffix-icon" class:collapsed>
                        {#if collapsed}
                            <HeaderChevronBase size="16"  />
                        {:else}
                            {#if isMenuOpen} 
                                <ChevronUpIcon size="24"/>
                            {:else}
                                <ChevronDownIcon size="24"/>
                            {/if}
                        {/if}
                    </div>
				<MenuLabel {label} bind:collapsed />
			</MenuIcons>
		</MenuBase>
	</Box>

	<div class:body={true} class:visible={isMenuOpen && !collapsed}>
		<slot />
	</div>
</div>

<style lang="scss">
	div {
		animation-duration: 300ms;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
	}
	.icon.collapsed {
		padding-left: 16px;
	}
    .suffix-icon:not(.collapsed) {
        margin-left: 12px;
        margin-right: 12px;
    }
	.body {
		overflow: hidden;
		animation-name: body-out;
		gap: 12px;
	}
	.body.visible {
		animation-name: body-in;
	}
	@keyframes body-in {
		from {
			opacity: 0;
			display: flex;
			flex-direction: column;
			height: 0;
		}
		to {
			height: initial;
			opacity: 1;
		}
	}
	@keyframes body-out {
		from {
			height: initial;
		}
		to {
			opacity: 0;
			display: none;
			height: 0px;
		}
	}
</style>
