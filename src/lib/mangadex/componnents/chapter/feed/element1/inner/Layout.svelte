<script lang="ts">
	import ButtonBase from "@mangadex/componnents/theme/buttons/base/ButtonBase.svelte";
	export let haveBeenRead: boolean = true;
</script>

<article class="layout" class:haveBeenRead>
	<slot />
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
