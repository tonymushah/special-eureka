<script lang="ts">
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import { createEventDispatcher } from "svelte";
	interface Props {
		mangaId: string;
	}

	let { mangaId }: Props = $props();
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
	<Skeleton width="60px" height="100px" />
</div>

<style lang="scss">
	div.cover-image {
		grid-area: cover;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0px 10px;
	}
</style>
