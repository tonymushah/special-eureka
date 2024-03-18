<script lang="ts">
	import { ReadingStatus } from "@mangadex/gql/graphql";
	import type { ReadingStatusEventDetail } from "./index.js";
	import { createEventDispatcher } from "svelte";
	import getText from "@mangadex/utils/manga/readingStatus/getText.js";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import type { Writable } from "svelte/store";
	import MenuKeyed from "@mangadex/componnents/theme/menu/MenuKeyed.svelte";
	import ReadingStatusButton from "../ReadingStatusButton.svelte.js";
	let target: HTMLDivElement | undefined = undefined;
	export let readingStatus: Writable<ReadingStatus | undefined>;
	$: status = getText($readingStatus);
</script>

<div class="outer-button" bind:this={target}>
	<ButtonAccent>
		<div class="inner-button">
			<span>{status}</span>
		</div>
	</ButtonAccent>
</div>

<MenuKeyed
	bind:target
	items={[
		{
			label: "None",
			key: undefined
		},
		{
			label: getText(ReadingStatus.Reading),
			key: ReadingStatus.Reading
		},
		{
			label: getText(ReadingStatus.OnHold),
			key: ReadingStatus.OnHold
		},
		{
			label: getText(ReadingStatus.Dropped),
			key: ReadingStatus.Dropped
		},
		{
			label: getText(ReadingStatus.PlanToRead),
			key: ReadingStatus.PlanToRead
		},
		{
			label: getText(ReadingStatus.Completed),
			key: ReadingStatus.Completed
		},
		{
			label: getText(ReadingStatus.ReReading),
			key: ReadingStatus.ReReading
		}
	]}
	on:onSelect={({ detail }) => {
		const { value } = detail;
		readingStatus.set(value);
	}}
/>
