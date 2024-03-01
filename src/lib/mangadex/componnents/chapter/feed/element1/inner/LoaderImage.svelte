<script lang="ts">
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import { createEventDispatcher } from "svelte";
	export let mangaId: string;
	type MouseEnvDiv = MouseEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	type KeyboardEnvDiv = KeyboardEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	const dispatch = createEventDispatcher<{
		mangaClick: MouseEnvDiv & {
			id: string;
		};
		mangaKeyClick: KeyboardEnvDiv & {
			id: string;
		};
	}>();
</script>

<div
	tabindex="-1"
	role="button"
	on:keypress={(e) => {
		dispatch("mangaKeyClick", {
			...e,
			id: mangaId
		});
	}}
	on:click={(e) => {
		dispatch("mangaClick", {
			...e,
			id: mangaId
		});
	}}
	class="cover-image"
>
	<Skeleton width="80px" height="120px" />
</div>

<style lang="scss">
	div.cover-image {
		grid-area: cover;
	}
</style>
