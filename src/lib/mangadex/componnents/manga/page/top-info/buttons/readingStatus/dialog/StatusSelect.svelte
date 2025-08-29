<script lang="ts">
	import { ReadingStatus } from "@mangadex/gql/graphql";
	import getText from "@mangadex/utils/manga/readingStatus/getText.js";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import type { Writable } from "svelte/store";
	import MenuKeyed from "@mangadex/componnents/theme/menu/MenuKeyed.svelte";

	let target: HTMLDivElement | undefined = $state(undefined);
	interface Props {
		readingStatus: Writable<ReadingStatus | undefined>;
		disabled?: boolean;
	}

	let { readingStatus, disabled }: Props = $props();
	let isOpen: boolean = $state(false);

	let status = $derived(getText($readingStatus) ?? "None");
</script>

<div class="outer-button" bind:this={target}>
	<ButtonAccent
		isBase
		onclick={() => {
			isOpen = !isOpen;
		}}
		{disabled}
	>
		<div class="inner-button">
			<span>{status}</span>
		</div>
	</ButtonAccent>
</div>

<MenuKeyed
	--menu-height={"10em"}
	--menu-overflow={"scroll"}
	bind:isOpen
	bind:target
	items={[
		{
			label: "None",
			key: undefined
		},
		{
			label: getText(ReadingStatus.Reading) ?? "",
			key: ReadingStatus.Reading
		},
		{
			label: getText(ReadingStatus.OnHold) ?? "",
			key: ReadingStatus.OnHold
		},
		{
			label: getText(ReadingStatus.Dropped) ?? "",
			key: ReadingStatus.Dropped
		},
		{
			label: getText(ReadingStatus.PlanToRead) ?? "",
			key: ReadingStatus.PlanToRead
		},
		{
			label: getText(ReadingStatus.Completed) ?? "",
			key: ReadingStatus.Completed
		},
		{
			label: getText(ReadingStatus.ReReading) ?? "",
			key: ReadingStatus.ReReading
		}
	]}
	onSelect={(detail) => {
		const { value } = detail;
		readingStatus.set(value);
	}}
	sameWidth
/>

<style lang="scss">
	.inner-button {
		width: 7em;
	}
</style>
