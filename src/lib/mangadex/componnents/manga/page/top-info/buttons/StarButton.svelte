<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import MenuKeyed from "@mangadex/componnents/theme/menu/MenuKeyed.svelte";
	import { createEventDispatcher } from "svelte";
	import StarIcon from "./star-button/StarIcon.svelte";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import getText from "./star-button/getText";
	import { getTopMangaRatingContextStore } from "../context";

	let isOpen = false;
	let target: HTMLDivElement | undefined = undefined;

	const ratingStore = getTopMangaRatingContextStore();
	const dispatch = createEventDispatcher<{
		select: number;
	}>();

	$: rating = $ratingStore;

	function toggle() {
		isOpen = !isOpen;
	}
</script>

<div class="star-button" bind:this={target}>
	{#if rating == undefined}
		<ButtonAccent isBase on:click={toggle}>
			<StarIcon />
		</ButtonAccent>
	{:else}
		<PrimaryButton isBase on:click={toggle}>
			<div class="inner-button">
				<StarIcon />
				<span>{rating}</span>
			</div>
		</PrimaryButton>
	{/if}
</div>

<MenuKeyed
	--menu-height={"16em"}
	--menu-overflow={"scroll"}
	on:onSelect={({ detail }) => {
		dispatch("select", detail.value);
	}}
	bind:target
	bind:isOpen
	items={Array.from({ length: 10 }, (_, i) => i + 1)
		.map((i) => ({
			label: `(${i}) ${getText(i)}`,
			key: i
		}))
		.toReversed()}
/>

<style lang="scss">
	.inner-button {
		display: flex;
	}
</style>
