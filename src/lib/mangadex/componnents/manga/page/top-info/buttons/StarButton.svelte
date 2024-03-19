<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import MenuKeyed from "@mangadex/componnents/theme/menu/MenuKeyed.svelte";
	import { createEventDispatcher } from "svelte";
	import { writable } from "svelte/store";
	import StarIcon from "./star-button/StarIcon.svelte";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import getText from "./star-button/getText";

	let isOpen = false;
	let target: HTMLDivElement | undefined = undefined;

	const dispatch = createEventDispatcher<{
		select: number;
	}>();

	export let rating: number | undefined = undefined;

	function toggle() {
		isOpen = !isOpen;
	}
</script>

<div class="star-button" bind:this={target}>
	{#if rating}
		<ButtonAccent on:click={toggle}>
			<StarIcon />
		</ButtonAccent>
	{:else}
		<PrimaryButton>
			<div class="inner-button">
				<StarIcon />
				<span>{rating}</span>
			</div>
		</PrimaryButton>
	{/if}
</div>

<MenuKeyed
	on:onSelect={({ detail }) => {
		dispatch("select", detail.value);
	}}
	bind:target
	bind:isOpen
	items={Array.from({ length: 10 }, (_, i) => i + 1).map((i) => ({
		label: `(${i}) ${getText(i)}`,
		key: i
	}))}
/>
