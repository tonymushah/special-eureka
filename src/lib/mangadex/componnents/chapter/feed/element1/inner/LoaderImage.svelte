<script lang="ts">
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";

	type MouseEnvDiv = MouseEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	type KeyboardEnvDiv = KeyboardEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	interface Events {
		onmangaClick?: (
			ev: MouseEnvDiv & {
				id: string;
			}
		) => any;
		onmangaKeyClick?: (
			ev: KeyboardEnvDiv & {
				id: string;
			}
		) => any;
	}
	interface Props extends Events {
		mangaId: string;
	}

	let { mangaId, onmangaClick, onmangaKeyClick }: Props = $props();
</script>

<div
	tabindex="-1"
	role="button"
	onkeypress={(e) => {
		onmangaKeyClick?.({
			...e,
			id: mangaId
		});
	}}
	onclick={(e) => {
		onmangaClick?.({
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
