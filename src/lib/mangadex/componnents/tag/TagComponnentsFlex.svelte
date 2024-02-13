<script lang="ts">
	import TagComponnents from "./TagComponnents.svelte";

	type Tag = {
		id: string;
		name: string;
	};
	export let tags: Tag[];
</script>

<div>
	<TagComponnents {tags} />
</div>

<style lang="scss">
	div {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}
</style>
