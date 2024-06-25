<script lang="ts">
	import { initChapterImageContext } from "../../../contexts/images";
	import LongStrip from "../LongStrip.svelte";
	export let images: string[];
	initChapterImageContext(images);
</script>

<LongStrip />
