<script lang="ts" module>
	export type AltTitleItem = {
		lang: string;
		title: string;
	};
</script>

<script lang="ts">
	import AltTitle from "./AltTitle.svelte";

	interface Props {
		titles: AltTitleItem[];
	}

	let { titles }: Props = $props();
</script>

<div class="alt-titles">
	{#each titles as { title, lang }}
		<AltTitle {title} {lang} />
	{/each}
</div>

<style lang="scss">
	.alt-titles {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
</style>
