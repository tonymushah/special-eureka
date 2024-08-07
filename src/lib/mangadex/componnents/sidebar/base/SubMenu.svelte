<script lang="ts">
	import { sidebarState as isOpen } from "@mangadex/stores";
	import { ChevronUpIcon } from "svelte-feather-icons";
	import { slide } from "svelte/transition";
	import HeaderChevronBase from "../header/HeaderChevronBase.svelte";
	import MenuBase from "./MenuBase.svelte";
	import MenuIcons from "./MenuIcons.svelte";
	import MenuLabel from "./MenuLabel.svelte";
	export let label: string;
	$: collapsed = $isOpen;
	let isMenuOpen = false;
</script>

<div class="outer">
	<div
		role="button"
		tabindex="0"
		on:keypress={() => {
			isMenuOpen = !isMenuOpen;
		}}
		on:click={() => {
			isMenuOpen = !isMenuOpen;
		}}
	>
		<MenuBase bind:collapsed>
			<MenuIcons>
				<div slot="icon" class="icon" class:collapsed>
					<slot name="icon" />
				</div>
				<div slot="suffix-icon" class="suffix-icon" class:collapsed class:isMenuOpen>
					{#if collapsed}
						<HeaderChevronBase size="16" />
					{:else}
						<ChevronUpIcon size="24" />
					{/if}
				</div>
				<MenuLabel {label} bind:collapsed />
			</MenuIcons>
		</MenuBase>
	</div>

	{#if isMenuOpen && !collapsed}
		<div class:body={true} transition:slide>
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	div {
		color: var(--text-color);
		animation-duration: 300ms;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
	}
	.icon.collapsed {
		padding-left: 16px;
	}
	.suffix-icon {
		transition: rotate 200ms ease-in-out;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.suffix-icon:not(.collapsed) {
		margin-left: 12px;
		margin-right: 12px;
	}
	.suffix-icon.isMenuOpen {
		rotate: 180deg;
	}
	.body {
		overflow: hidden;
		animation-name: body-out;
		gap: 12px;
	}
</style>
