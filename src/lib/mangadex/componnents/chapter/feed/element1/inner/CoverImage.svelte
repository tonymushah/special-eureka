<script lang="ts">
	import { createEventDispatcher } from "svelte";
	interface Props {
		mangaId: string;
		coverImage: string;
		coverImageAlt: string;
	}

	let { mangaId, coverImage, coverImageAlt }: Props = $props();
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
	onkeypress={(e) => {
		dispatch("mangaKeyClick", {
			...e,
			id: mangaId
		});
	}}
	onclick={(e) => {
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
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0px 10px;
	}
	div.cover-image > img {
		height: 100px;
		width: 60px;
		object-fit: cover;
		border-radius: 0.25em;
		image-rendering: crisp-edges;
		-webkit-image-rendering: crisp-edges;
	}
</style>
