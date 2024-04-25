<script lang="ts">
	import { createEventDispatcher, type ComponentProps } from "svelte";
	import VolumeAccordion from "./VolumeAccordion.svelte";

	export let volumes: ComponentProps<VolumeAccordion>[];
	export let openStart = false;
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

<div class="volumes">
	{#each volumes as volume, l}
		<VolumeAccordion
			isOpen={l == 0 && openStart}
			{...volume}
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

<style lang="scss">
</style>
