<script lang="ts">
	import { createEventDispatcher, type ComponentProps } from "svelte";
	import Chapters from "./ChaptersAccordion.svelte";
	import Accordion from "@mangadex/componnents/theme/accordion/Accordion.svelte";

	export let title: string;
	export let volumeContent: ComponentProps<Chapters>[];
	type MouseEnvDiv = MouseEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	type KeyboardEnvDiv = KeyboardEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	const dispatch = createEventDispatcher<{
		download: MouseEnvDiv & {
			id: string;
		};
		downloadKeyPress: KeyboardEnvDiv & {
			id: string;
		};
		read: MouseEnvDiv & {
			id: string;
		};
		readKeyPress: KeyboardEnvDiv & {
			id: string;
		};
	}>();
</script>

<Accordion {title} withBorder>
	<div class="volume">
		{#each volumeContent as chapters (chapters.title)}
			<Chapters
				{...chapters}
				on:download={({ detail }) => {
					dispatch("download", detail);
				}}
				on:downloadKeyPress={({ detail }) => {
					dispatch("downloadKeyPress", detail);
				}}
				on:read={({ detail }) => {
					dispatch("read", detail);
				}}
				on:readKeyPress={({ detail }) => {
					dispatch("readKeyPress", detail);
				}}
			/>
		{/each}
	</div>
</Accordion>

<style lang="scss">
	.volume {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 5px;
	}
</style>
