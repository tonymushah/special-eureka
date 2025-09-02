<script lang="ts">
	import type { PageData } from "./$types";
	import TopTenTags from "./TopTenTags.svelte";

	let { id }: PageData = $props();
</script>

<section>
	<TopTenTags {id} />
</section>
