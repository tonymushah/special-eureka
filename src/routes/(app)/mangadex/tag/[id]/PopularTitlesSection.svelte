<script lang="ts">
	import Content from "@mangadex/componnents/tag/page/popular-section/Content.svelte";

	interface Props {
		id: string;
	}
	let { id }: Props = $props();
</script>

<section>
	<h3>Popular Titles</h3>
	<Content {id} />
</section>
