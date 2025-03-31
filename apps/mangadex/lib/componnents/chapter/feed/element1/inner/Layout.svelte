<script lang="ts">
	interface Props {
		haveBeenRead?: boolean;
		mangaId: string;
		children?: import("svelte").Snippet;
	}

	let { haveBeenRead = $bindable(true), children, mangaId }: Props = $props();
</script>

<article class="layout manga-element" class:haveBeenRead data-manga-id={mangaId}>
	{@render children?.()}
</article>

<style lang="scss">
	article.layout {
		color: text;
		width: var(--layout-width);
		display: flex;
		flex-direction: row;
		padding-right: 10px;
		height: 120px;
		overflow: hidden;
		text-overflow: ellipsis;
		border-radius: 0.25em;
	}
	.layout:not(.haveBeenRead) {
		border-style: solid;
		border-width: 0px 0px 0px 5px;
		border-color: var(--indication-blue);
	}
</style>
