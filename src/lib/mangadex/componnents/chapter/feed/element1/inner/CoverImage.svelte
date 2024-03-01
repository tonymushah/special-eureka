<script lang="ts">
	import { createEventDispatcher } from "svelte";
	export let mangaId: string;
	export let coverImage: string;
	export let coverImageAlt: string;
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
	<img src={coverImage} alt={coverImageAlt} />
</div>

<style lang="scss">
	div.cover-image {
		grid-area: cover;
	}
	div.cover-image > img {
		height: 120px;
		width: 80px;
		object-fit: cover;
	}
</style>
