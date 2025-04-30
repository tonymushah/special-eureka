<script lang="ts">
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
		coverImage: string;
		coverImageAlt: string;
	}

	let { mangaId, coverImage, coverImageAlt, onmangaClick, onmangaKeyClick }: Props = $props();
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
