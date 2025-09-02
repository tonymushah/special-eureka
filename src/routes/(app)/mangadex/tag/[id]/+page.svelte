<script lang="ts">
	import type { PageData } from "./$types";
	import TopTenTags from "./TopTenTags.svelte";

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
</script>

<TopTenTags id={data.id} />
