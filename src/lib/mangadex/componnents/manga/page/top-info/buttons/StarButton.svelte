<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import MenuKeyed from "@mangadex/componnents/theme/menu/MenuKeyed.svelte";
	import { getTopMangaRatingContextStore } from "../context";
	import getText from "./star-button/getText";
	import StarIcon from "./star-button/StarIcon.svelte";

	let isOpen = $state(false);
	let target: HTMLDivElement | undefined = $state(undefined);

	const ratingStore = getTopMangaRatingContextStore();
	interface Events {
		onselect?: (ev: number) => any;
	}
	interface Props extends Events {
		disabled?: boolean;
	}

	let { onselect, disabled }: Props = $props();

	let rating = $derived($ratingStore);

	function toggle() {
		isOpen = !isOpen;
	}
</script>

<div class="star-button" bind:this={target}>
	{#if rating == undefined}
		<ButtonAccent isBase onclick={toggle} {disabled}>
			<StarIcon />
		</ButtonAccent>
	{:else}
		<PrimaryButton isBase onclick={toggle} {disabled}>
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
	onSelect={(detail) => {
		onselect?.(detail.value);
	}}
	fitContent
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
		gap: 10px;
	}
</style>
