<script lang="ts">
	import { ChevronDownIcon } from "svelte-feather-icons";
	import { slide } from "svelte/transition";

	export let title: string;
	export let isOpen: boolean = false;
	export let key: string = "Enter";
	function toggle() {
		isOpen = !isOpen;
	}
</script>

<div class="accordion" class:isOpen>
	<div
		role="button"
		on:click={() => {
			toggle();
		}}
		on:keydown={({ key: keyDown }) => {
			if (keyDown == key) {
				toggle();
			}
		}}
		tabindex="0"
		class="title"
	>
		<slot name="title">
			<div class="default">
				<p>{title}</p>
				<div class="chevron">
					<ChevronDownIcon />
				</div>
			</div>
		</slot>
	</div>
	{#if isOpen}
		<div transition:slide class="content">
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	.accordion {
		transition: border 300ms ease-in-out;
		border-radius: 5px;
		.title {
			transition: border 300ms ease-in-out;
			padding: 5px;
			border-color: var(--mid-tone);
			border-bottom-width: 1px;
			border-bottom-style: solid;
			.default {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.chevron {
					transition: rotate 300ms ease-in-out;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
			p {
				margin: 0px;
			}
		}
	}
	.accordion.isOpen {
		.chevron {
			rotate: 180deg;
		}
	}
	.accordion.isOpen:hover {
		.title {
			border-color: var(--mid-tone);
			border-bottom-width: 1px;
			border-bottom-style: solid;
		}
	}
	.accordion:not(.isOpen):hover {
		.title {
			border: none;
		}
	}
	.accordion:hover {
		border-color: var(--mid-tone);
		border-width: 1px;
		border-style: solid;
	}
</style>
