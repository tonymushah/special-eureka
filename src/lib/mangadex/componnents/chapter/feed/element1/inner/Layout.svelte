<script lang="ts">
	import ButtonBase from "@mangadex/componnents/theme/buttons/base/ButtonBase.svelte";
	interface Props {
		haveBeenRead?: boolean;
		children?: import('svelte').Snippet;
	}

	let { haveBeenRead = true, children }: Props = $props();
</script>

<article class="layout" class:haveBeenRead>
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
